import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/bookings/booking.schema';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Invoice } from 'src/schemas/invoice.schema';
import { IInvoice } from 'src/invoices/invoice.model';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InvoiceStatusChangeEvent } from 'src/events/invoice-status-change.event';
import { FlightFromQuotationRequest } from 'src/events/flights.events';
import { IBookedItem, IBooking } from './booking.model';
import { generateUID } from 'src/utils/uid.util';
import { platformFee } from 'src/utils/constants';
import { Operator } from 'src/schemas/operator.schema';
import { SendEmailEvent } from 'src/events/notifications.events';
import { Flight } from 'src/flights/flight.schema';
import { User } from 'src/schemas/user.schema';
import { NumberGeneratorService } from 'src/services/number-generator';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking.name) private model: Model<Booking>,
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        @InjectModel(Operator.name) private operatorModel: Model<Operator>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Flight.name) private flightModel: Model<Flight>,
        private readonly eventEmitter: EventEmitter2,
        private readonly numberGeneratorService: NumberGeneratorService
    ) { }

    async create(createBookingDto: CreateBookingDto) {
        // Generate a booking number
        const bookingNumber = await this.numberGeneratorService.generateNumber('BKN');

        // Create a new booking object and add the generated booking number
        const booking = new this.model({
            ...createBookingDto,
            bookingNumber,
        });

        await booking.save();

        const date = new Date();

        // Generate an invoice number
        const invoiceNumber = await this.numberGeneratorService.generateNumber("INV");

        const invoice: IInvoice = {
            invoiceNumber: invoiceNumber,
            status: 'Due',
            subTotal: createBookingDto.subTotal,
            taxAmount: createBookingDto.taxAmount,
            totalAmount: createBookingDto.totalAmount,
            customerId: createBookingDto.customer._id,
            bookingId: booking.id,
            dateIssued: date,
            currency: createBookingDto.currency,
            auditFields: createBookingDto.auditFields
        }

        const invoiceDocument = new this.invoiceModel(invoice);
        await invoiceDocument.save();

        // Update the maxSeatsAvailable on the flight
        const flight = await this.flightModel.findById(createBookingDto.flightId).exec();
        const updatedMaxSeatsAvailable = flight.maxSeatsAvailable - createBookingDto.numberOfPassengers;

        await this.flightModel.findByIdAndUpdate(flight._id, { maxSeatsAvailable: updatedMaxSeatsAvailable }, { new: true }).exec();

        // Emit an event to notify other services that a new booking has been created
        this.eventEmitter.emit('booking.created', booking);

        return await this.model
            .findByIdAndUpdate(booking.id, {
                invoiceId: invoiceDocument.id,
                status: 'Invoiced',
                platformFee: platformFee * createBookingDto.totalAmount,
            }, { new: true });
    }

    async findAll() {
        return await this.model.find().populate(['invoiceId', 'flightId', 'operatorId']);
    }

    async findInIdsArray(filter: any) {
        if (filter._ids && Array.isArray(filter._ids)) {
            filter._id = { $in: filter._ids };
            delete filter._ids; // Remove _ids from the filter as it has been transformed
        }
        return await this.model.find({ ...filter }).populate(['invoiceId', 'flightId', 'operatorId']);
    }

    findOne(id: string) {
        return this.model.findById(id).populate(['invoiceId', 'flightId', 'operatorId']);
    }

    findByFilter(filter: any) {
        return this.model.find({ ...filter }).populate(['invoiceId', 'flightId', 'operatorId']);
    }

    async update(id: string, updateBookingDto: UpdateBookingDto) {
        // Fetch the current booking status before updating
        const existingBooking = await this.model.findById(id);

        if (!existingBooking) {
            throw new Error('Booking not found');
        }

        // Perform the update
        const updatedBooking = await this.model.findByIdAndUpdate(id, updateBookingDto, { new: true }).populate(['invoiceId', 'flightId', 'operatorId']);

        // Check if the status was changed to "Cancelled"
        if (existingBooking.status !== updatedBooking.status && updatedBooking.status === "Cancelled") {
            try {
                // Increase available seats on flight
                await this.increaseAvailableSeatsOnBookingCancellation(updatedBooking);
                // Invoke a function to notify relevant parties
                await this.notifyCancellation(updatedBooking);
            } catch (err: any) {
                console.log(err)
            }
        }

        return updatedBooking;
    }

    private async increaseAvailableSeatsOnBookingCancellation(booking: any) {
        try {
            // Increase available seats on flight
            const flight = await this.flightModel.findById(booking.flightId._id);
            await this.flightModel.findOneAndUpdate(booking.flightId._id, {
                maxSeatsAvailable: flight.maxSeatsAvailable + booking.numberOfPassengers
            });
        } catch (err: any) {
            console.log(err)
        }
    }

    // Function to handle cancellation notifications
    private async notifyCancellation(booking: any) {
        try {
            // Sub-task LEV-1036: Determine email recipients - Operator
            const operator = await this.operatorModel.findById(booking.operatorId)
            const operatorEmail = operator.email;
            const operatorTarget = "operator";

            const flight = await this.flightModel.findById(booking.flightId._id)

            const emailSubject = "Booking Cancellation Notification";
            const templateName = "booking-cancelled";

            // Sub-task LEV-1035: Prepare the email template - Build operator email payload
            const operatorPayload = {
                operatorName: operator.airline,
                bookingId: booking._id,
                flightNumber: booking.flightNumber,
                customerName: booking.customer.displayName,
                departureAirport: flight.departureAirport,
                arrivalAirport: flight.arrivalAirport,
            }

            // Sub-task LEV-1037: Send the email - Send operator email notification
            this.eventEmitter.emit('notification.sendEmail', new SendEmailEvent(
                [operatorEmail],
                emailSubject,
                operatorTarget,
                templateName,
                operatorPayload
            ));

            // Sub-task LEV-1036: Determine email recipients - Customer
            const user = await this.userModel.findById(booking.customer._id)
            const customerEmail = booking.customer.email;
            const customerTarget = user.agencyId ? "agent" : "client";

            // Sub-task LEV-1035: Prepare the email template - Build customer email payload
            const customerPayload = {
                customerName: booking.customer.displayName,
                bookingId: booking._id,
                flightNumber: booking.flightNumber,
                departureAirport: flight.departureAirport,
                arrivalAirport: flight.arrivalAirport,
            }

            // Sub-task LEV-1037: Send the email - Send customer email notification
            this.eventEmitter.emit('notification.sendEmail', new SendEmailEvent(
                [customerEmail],
                emailSubject,
                customerTarget,
                templateName,
                customerPayload
            ));
        } catch (error) {
            console.error(error);
        }
    }

    @OnEvent('invoice.statusChange', { async: true })
    async updateBookingStatus(payload: InvoiceStatusChangeEvent) {
        await this.model.findByIdAndUpdate(payload.bookingId, { status: payload.status });

        switch (payload.status) {
            case 'Paid':
                break;
            case 'Cancelled':
                break;
            default:

                break;
        }
    }

    @OnEvent('flight.fromQuotationRequest', { async: true })
    async createBookingFromQuotationRequest(payload: FlightFromQuotationRequest) {

        const bookedItems: IBookedItem[] = [];

        for (let i = 0; i < payload.quotationRequest.numberOfPassengers.adults; i++) {
            bookedItems.push(
                {
                    adults: 1,
                    children: 0,
                    infants: 0,
                    totalNumberOfPassengers: 1,
                    totalPrice: payload.flight.pricePerSeat
                }
            );
        }

        for (let i = 0; i < payload.quotationRequest.numberOfPassengers.children; i++) {
            bookedItems.push(
                {
                    adults: 0,
                    children: 1,
                    infants: 0,
                    totalNumberOfPassengers: 1,
                    totalPrice: payload.flight.pricePerSeat
                }
            );
        }

        for (let i = 0; i < payload.quotationRequest.numberOfPassengers.infants; i++) {
            bookedItems.push(
                {
                    adults: 0,
                    children: 0,
                    infants: 1,
                    totalNumberOfPassengers: 1,
                    totalPrice: payload.flight.pricePerSeat
                }
            );
        }

        const totalPriceWithFee = (platformFee * payload.quotation.price.amount) + payload.quotation.price.amount;
        const calculatedPlatformFee = (platformFee * payload.quotation.price.amount);
        // const pricePerSeatWithPlatformFee = (totalPriceWithFee / payload.quotationRequest.numberOfPassengers);

        // Get customer from quotationRequest customerId
        const { email, firstNames, lastName, displayName, address, phoneNumber, country, role } = await this.userModel.findById(payload.quotationRequest.customerId);

        const booking: IBooking = {
            flightId: payload.flight._id,
            bookingNumber: 'CBK' + '-' + generateUID(),
            customer: {
                _id: payload.quotationRequest.customerId,
                email,
                firstNames,
                lastName,
                displayName,
                address,
                phoneNumber,
                country,
                role
            },
            numberOfPassengers: payload.quotationRequest.numberOfPassengers.total,
            operatorId: payload.flight.operatorId,
            operatorName: payload.flight.airline,
            items: bookedItems,
            currency: payload.quotation.price.currency,
            subTotal: payload.quotation.price.amount,
            taxAmount: 0,
            platformFee: calculatedPlatformFee,
            totalAmount: totalPriceWithFee,
            status: 'Invoiced',
            auditFields: {
                createdBy: 'System',
                createdById: '',
                dateCreated: new Date(),
            }
        };

        const doc = new this.model(booking);
        await doc.save();

        const date = new Date();

        const invoiceNumber = await this.numberGeneratorService.generateNumber("INV");

        const invoice: IInvoice = {
            invoiceNumber: invoiceNumber,
            status: 'Due',
            subTotal: booking.subTotal,
            taxAmount: booking.taxAmount,
            totalAmount: totalPriceWithFee,
            customerId: booking.customer._id,
            bookingId: doc._id.toString(),
            quotationId: payload.quotation._id,
            dateIssued: date,
            currency: booking.currency,
            auditFields: booking.auditFields
        }

        const invoiceDocument = new this.invoiceModel(invoice);
        await invoiceDocument.save();

        await this.model
            .findByIdAndUpdate(doc._id, { invoiceId: invoiceDocument._id.toString() }, { new: true });

    }
}
