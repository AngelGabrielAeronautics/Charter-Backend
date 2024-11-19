import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from 'src/schemas/ticket.schema';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { Booking } from 'src/bookings/booking.schema';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InvoiceStatusChangeEvent } from 'src/events/invoice-status-change.event';
import { ITicket } from './ticket.model';
import { IBookedItem } from 'src/bookings/booking.model';
import { TicketsGeneratedEvent } from 'src/events/tickets-generated.event';
import { generateUID } from 'src/utils/uid.util';

@Injectable()
export class TicketsService {
    constructor(
        @InjectModel(Ticket.name) private model: Model<Ticket>,
        @InjectModel(Booking.name) private bookingsModel: Model<Booking>,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    create(dto: CreateTicketDto) {

        const date = new Date();

        const ticketNumber = 'TK-'
            + date.getFullYear()
            + date.getMonth()
            + date.getDate() + '-'
            + (Date.now()).toString(35).toUpperCase();

        dto.ticketNumber = ticketNumber;

        const document = new this.model(dto);
        return document.save();
    }

    findAll() {
        return this.model.find();
    }

    findOne(id: string) {
        return this.model.findById(id).populate(['bookingId', 'flightId']);
    }

    async findPopulated() {
        return await this.model.find().populate(['bookingId', 'flightId']);
    }

    async update(id: string, dto: UpdateTicketDto) {
        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }

    findByFilter(filter: any) {
        return this.model.find({ ...filter });
    }

    @OnEvent('invoice.statusChange', { async: true })
    async onTicketsGeneratedHandler(payload: InvoiceStatusChangeEvent) {

        switch (payload.status) {
            case 'Paid':
                if (payload.flightId) {
                    this.createTickets(payload.bookingId, payload.flightId);
                }
                break;
            case 'Cancelled':
                break;
            default:

                break;
        }

        console.log("Updating Booking Status", payload);

    }

    async createTickets(bookingId: string, flightId: string) {
        const booking = await this.bookingsModel.findById(bookingId);

        const tickets: ITicket[] = []
        const splitInvoiceNumber = booking.bookingNumber.split('-');
        const prefix = splitInvoiceNumber[splitInvoiceNumber.length - 1];

        for (let i = 0; i < booking.numberOfPassengers; i++) {

            const ticketNumber = "CTK-"
                + prefix
                + "-0" + (i + 1).toString()
                + generateUID();

            const ticket: ITicket = {
                flightId: flightId,
                ticketNumber: ticketNumber,
                customerId: booking.customer._id,
                bookingId: booking.id,
                invoiceId: booking.invoiceId,
                operatorId: booking.operatorId,
                agencyId: booking.agencyId ?? "",
                auditFields: {
                    createdBy: "System",
                    createdById: "System",
                    dateCreated: new Date()
                }
            };

            tickets.push(ticket);
        }

        console.log(tickets.length);

        await this.model.create(tickets);
        this.eventEmitter.emit('ticket.ticketsCreated', new TicketsGeneratedEvent(tickets, booking.flightId));
    }

}
