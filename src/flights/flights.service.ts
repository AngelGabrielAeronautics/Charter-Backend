import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from 'src/flights/flight.schema';
import { CreateFlightDto } from './dto/create-flight.dto';
import { IFlightSearchCriteria } from 'src/models/flight-search-criteria.model';
import { UpdateFlightDto } from './dto/update-flight.dto';
import * as moment from 'moment';
import { OperatorsService } from 'src/operators/operators.service';
import { AssetsService } from 'src/assets/assets.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { QuotationRequestStatusEvent } from 'src/events/quotation-events';
import { IFlight } from './flight.model';
import { FlightChecklistUpdated, FlightFromQuotationRequest } from 'src/events/flights.events';
import { generateUID } from 'src/utils/uid.util';
import { platformFee } from 'src/utils/constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceStatusChangeEvent } from 'src/events/invoice-status-change.event';
import { BookingsService } from 'src/bookings/bookings.service';
import { SendEmailEvent } from 'src/events/notifications.events';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FlightsService {
    constructor(
        @InjectModel(Flight.name) private model: Model<Flight>,
        private operatorsService: OperatorsService,
        private assetsService: AssetsService,
        private bookingsService: BookingsService,
        private usersService: UsersService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async search(criteria: IFlightSearchCriteria[]) {


        const criterion = criteria[0];


        try {
            const departureDate = moment.utc(criterion.departureDate);
            // Set departureDate time to data.departureTime

            const startOfDay = departureDate.startOf("day").toDate();

            const endOfDay = departureDate.endOf("day").toDate();

            const primaryResults = await this.model.find({
                "departureAirport.fullLabel": criterion.departureAirport,
                "arrivalAirport.fullLabel": criterion.arrivalAirport,
                "departure": departureDate.toDate(),
                "maxSeatsAvailable": { $gte: criterion.numberOfPassengers },
                "status": "Offered",
            });

            if (primaryResults.length > 0) return primaryResults;


            const secondaryResults = await this.model.find({
                "departureAirport.fullLabel": criterion.departureAirport,
                "arrivalAirport.fullLabel": criterion.arrivalAirport,
                "departure": {
                    $gte: startOfDay,
                    $lte: endOfDay
                },
                "maxSeatsAvailable": { $gte: criterion.numberOfPassengers },
                "status": "Offered",
            })

            return secondaryResults;
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    async create(dto: CreateFlightDto) {
        try {
            const operator = await this.operatorsService.findOne(dto.operatorId);
            const aircraft = await this.assetsService.findOne(dto.aircraftId);

            const assetData = {
                aircraftId: dto.aircraftId,
                aircraftManufacturer: aircraft.manufacturer,
                aircraftModel: aircraft["model"],
                aircraftRegistrationNumber: aircraft.registrationNumber,
                capacity: aircraft.seatingCapacity,
            }

            const checklist = {
                adminNotes: [],
                aircraftBooked: false,
                airportHandler: false,
                allPaymentsReceived: false,
                arrivalAndIndemnity: false,
                catering: false,
                crewAccommodation: false,
                issuedAllTickets: false,
                roadShuttle: false,
                supplierPaid: false
            }

            const totalPrice = assetData.capacity * dto.pricePerSeat;
            const totalPriceWithFee = (platformFee * totalPrice) + totalPrice;
            const pricePerSeatWithPlatformFee = (totalPriceWithFee / assetData.capacity);

            const uniqueId = generateUID();

            const flightNumber = operator
                .airline.slice(0, 3)
                .toLocaleUpperCase()
                + "-"
                + uniqueId.toUpperCase();

            const flight = new this.model({
                ...dto,
                flightNumber: flightNumber,
                airline: operator.airline,
                ...assetData,
                maxSeatsAvailable: assetData.capacity,
                checklist,
                totalFlightPrice: totalPriceWithFee,
                pricePerSeatWithPlatformFee,
            });

            return flight.save();
        }
        catch (error) {
            // console.log(error instanceof ValidationError);
            console.log('SERVICE:', error);
            throw new InternalServerErrorException('failed');
        }
    }

    findAll() {
        return this.model.find()
            .populate('operator') // Specify fields to include
            .populate('aircraft')
            .exec();
    }

    async findByFilter(filter: any) {
        return await this.model.find({ ...filter });
    }

    async getFlightsWithOperators(filter: any) {
        return this.model
            .find({ ...filter })
            .populate('operator') // Specify fields to include
            .populate('aircraft')
            .exec();
    }

    async findInIdsArray(filter: any) {
        if (filter._ids && Array.isArray(filter._ids)) {
            filter._id = { $in: filter._ids };
            delete filter._ids; // Remove _ids from the filter as it has been transformed
        }
        return await this.model.find({ ...filter });
    }

    async textSearch(searchText: string) {
        return this.model.aggregate(
            [
                {
                    $match: { $text: { $search: searchText } }
                }
            ]
        )
    }

    findOne(id: string) {
        return this.model.findById(id);
    }

    async update(id: string, dto: UpdateFlightDto) {

        // Checklist
        if (dto.checklist !== undefined) {
            this.eventEmitter.emit('flight.checklistUpdated', new FlightChecklistUpdated(
                id,
                dto.checklist
            ));
        }

        // Fetch existing flight details before update to compare for changes
        const existingFlight = await this.model.findById(id);
        if (!existingFlight) {
            throw new Error('Flight not found');
        }

        // Perform the update
        const updatedFlight = await this.model.findByIdAndUpdate(id, dto, { new: true });
        if (!updatedFlight) {
            throw new Error('Failed to update flight');
        }

        // Detect and notify passengers of material changes
        await this.detectAndNotifyStakeholdersOnFlightChanges(existingFlight, updatedFlight);

        return updatedFlight;
    }

    // Updated function to detect and notify stakeholders on flight changes
    private async detectAndNotifyStakeholdersOnFlightChanges(existingFlight: any, updatedFlight: any) {
        // Identify material changes
        const changes: string[] = [];

        if (existingFlight.departureAirport !== updatedFlight.departureAirport) {
            changes.push('Departure Airport');
        }
        if (existingFlight.arrivalAirport !== updatedFlight.arrivalAirport) {
            changes.push('Arrival Airport');
        }
        if (existingFlight.departure !== updatedFlight.departure) {
            changes.push('Departure Date and Time');
        }
        if (existingFlight.aircraftId !== updatedFlight.aircraftId) {
            changes.push('Aircraft');
        }
        if (existingFlight.meetingTime !== updatedFlight.meetingTime) {
            changes.push('Departure Meeting Time');
        }
        if (existingFlight.arrivalMeetingTime !== updatedFlight.arrivalMeetingTime) {
            changes.push('Arrival Meeting Time');
        }
        if (existingFlight.meetingArea !== updatedFlight.meetingArea) {
            changes.push('Departure Meeting Area');
        }
        if (existingFlight.arrivalMeetingArea !== updatedFlight.arrivalMeetingArea) {
            changes.push('Arrival Meeting Area');
        }
        if (existingFlight.status !== updatedFlight.status && updatedFlight.status === 'Cancelled') {
            changes.push('Flight Status ➞ Cancelled');
        }

        // If there are material changes, notify stakeholders
        if (changes.length > 0) {
            // Fetch bookings related to the updated flight
            const bookings = await this.bookingsService.findByFilter({ flightId: updatedFlight._id }).populate('customer');

            if (bookings.length === 0) {
                console.log('No bookings on this flight.');
                return;
            }

            const emailSubject = "Flight Updated";
            const templateName = "flight-updated";

            let target: "client" | "agent" | "operator" | "admin" = "client"

            for (const booking of bookings) {
                // Get booking customer as user
                const customer = await this.usersService.findOne(booking.customer._id);
                console.log("Customer =>", customer.displayName)
                console.log("Email =>", customer.email)

                switch (customer.role) {
                    case "Client":
                        target = "client";
                        break;

                    case "Agency":
                        target = "agent";
                        break;

                    default:
                        throw new Error('Customer user type not found');
                }

                // Prepare email payload
                const payload = {
                    customerName: customer.displayName,
                    flightNumber: updatedFlight.flightNumber,
                    departureLocation: updatedFlight.departureAirport.shortLabel,
                    departureDate: updatedFlight.departure,
                    arrivalLocation: updatedFlight.arrivalAirport.shortLabel,
                    arrivalDate: updatedFlight.arrivalDate,
                    changes: changes
                };

                // Send notification email to the target
                const customerEmail = booking.customer.email;
                this.eventEmitter.emit('notification.sendEmail', new SendEmailEvent(
                    [customerEmail],
                    emailSubject,
                    target,
                    templateName,
                    payload
                ));
            }

            // Additional logic to notify other stakeholders (e.g. operators or agents) can be added here as needed
        }
    }

    remove(id: string) {
        return this.model.findByIdAndDelete(id);
    }

    @OnEvent('quotation-request.status', { async: true })
    async onQuotationRequestStatusEvent(payload: QuotationRequestStatusEvent) {
        console.log("[ quotation-request.status - quotations ] Triggered");

        if (payload.quotationRequest.status === "Fulfilled") {

            const operator = await this.operatorsService.findOne(payload.quotation.operatorId);

            const uniqueId = generateUID();

            const flightNumber = operator
                .airline.slice(0, 3)
                .toLocaleUpperCase()
                + "-"
                + uniqueId.toUpperCase();

            const totalPriceWithFee = (platformFee * payload.quotation.price.amount) + payload.quotation.price.amount;
            const pricePerSeatWithPlatformFee = (totalPriceWithFee / payload.quotationRequest.numberOfPassengers.total);

            const checklist = {
                adminNotes: [],
                aircraftBooked: false,
                airportHandler: false,
                allPaymentsReceived: false,
                arrivalAndIndemnity: false,
                catering: false,
                crewAccommodation: false,
                issuedAllTickets: false,
                roadShuttle: false,
                supplierPaid: false
            };

            const aircraft = await this.assetsService.findOne(payload.quotation.aircraftId);

            const flight = {
                ...payload.quotation.flightDetails,
                quotationId: payload.quotation._id,
                airline: operator.airline,
                aircraftRegistrationNumber: aircraft.registrationNumber,
                aircraftModel: aircraft["model"],
                aircraftManufacturer: aircraft.manufacturer,
                flightNumber: flightNumber,
                totalFlightPrice: totalPriceWithFee,
                departure: payload.quotation.flightDetails.trip[0].departureDate,
                arrivalDate: payload.quotation.flightDetails.trip[0].arrivalDate,
                pricePerSeatWithPlatformFee,
                maxSeatsAvailable: aircraft.seatingCapacity - payload.quotationRequest.numberOfPassengers.total,
                checklist: checklist,
                flexibleRouting: payload.quotation.flightDetails.flexibleRouting || false,
                flexibleDepartureTime: payload.quotation.flightDetails.flexibleDepartureTime || false,
                flexibleDate: payload.quotation.flightDetails.flexibleDate || false,
                capacity: aircraft.seatingCapacity,
                meetingArea: payload.quotation.flightDetails.trip[0].departureMeetingPlace,
                meetingTime: payload.quotation.flightDetails.trip[0].departureMeetingTime,
                arrivalMeetingArea: payload.quotation.flightDetails.trip[0].arrivalMeetingPlace,
                arrivalMeetingTime: payload.quotation.flightDetails.trip[0].arrivalMeetingTime,
                durationMinutes: payload.quotation.flightDetails.trip[0].flightDurationMinutes,
                duration: payload.quotation.flightDetails.trip[0].flightDurationHours,
                arrivalAirport: payload.quotation.flightDetails.trip[0].arrivalAirport,
                departureAirport: payload.quotation.flightDetails.trip[0].departureAirport,
                status: 'Invoiced',
                auditFields: {
                    createdBy: 'System',
                    createdById: '',
                    dateCreated: new Date(),
                },
            };

            const doc = new this.model(flight);
            await doc.save();

            this.eventEmitter.emit('flight.fromQuotationRequest', new FlightFromQuotationRequest(
                doc as unknown as IFlight,
                payload.quotationRequest,
                payload.quotation
            ));
        }

    }

    @OnEvent('invoice.statusChange', { async: true })
    async updateFlightStatus(payload: InvoiceStatusChangeEvent) {
        await this.model.findByIdAndUpdate(payload.flightId, { status: payload.status == "Paid" ? "Offered" : "Cancelled" });
    }

    @OnEvent('flight.checklistUpdated', { async: true })
    async onFlightChecklistUpdatedHandler(payload: FlightChecklistUpdated) {

        const fieldsToCheck: string[] = [
            "aircraftBooked",
            "airportHandler",
            "allPaymentsReceived",
            "arrivalAndIndemnity",
            "catering",
            "crewAccommodation",
            "issuedAllTickets",
            "roadShuttle",
            "supplierPaid"
        ];

        let isReady = false;
        for (let i = 0; i < fieldsToCheck.length; i++) {
            const field: string = fieldsToCheck[i];
            if (!payload.checklist[field]) {
                isReady = false;
                break;
            }

            isReady = true;
        }

        if (isReady) {
            await this.model.findByIdAndUpdate(payload.flightId, { status: 'Ready' });
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        console.log('Running expired flights check');
        const now = moment()

        // Offered flights
        const flights = await this.model
            .find({
                status: 'Offered',
            });

        const flightsWithPassengers = flights.filter((e) => e.passengers.length > 0);
        const flightsWithNoPassengers = flights.filter((e) => e.passengers.length === 0);

        const expiredFlights: string[] = [];
        // Expiry Checks
        for (let i = 0; i < flightsWithNoPassengers.length; i++) {
            const flight = flightsWithNoPassengers[i];
            const departureDate = moment(flight.departure,);
            const diffInHours = departureDate.diff(now, 'hours',);

            if (diffInHours < 0) {
                expiredFlights.push(flight._id.toString());
                continue;
            }

            if (diffInHours <= flight.offerExpiryHoursPriorToFlight) {
                expiredFlights.push(flight._id.toString());
            }
        }

        const closedBookingFlights: string[] = [];
        // Bookings Closed Checks
        for (let i = 0; i < flightsWithPassengers.length; i++) {
            const flight = flightsWithPassengers[i];
            const departureDate = moment(flight.departure,);
            const diffInHours = departureDate.diff(now, 'hours',);

            if (diffInHours <= flight.offerExpiryHoursPriorToFlight) {
                closedBookingFlights.push(flight._id.toString());
            }
        }

        const writeOperations = [];
        writeOperations.push(...expiredFlights.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item },
                    update: { status: 'Expired' }
                }
            };
        })
        );

        writeOperations.push(...closedBookingFlights.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item },
                    update: { status: 'Bookings Closed' }
                }
            };
        })
        );

        await this.model.bulkWrite(writeOperations);
    }

}
