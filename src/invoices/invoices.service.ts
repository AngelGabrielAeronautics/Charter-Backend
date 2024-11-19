import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/bookings/booking.schema';
import { Invoice } from 'src/schemas/invoice.schema';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';
import { ITicket } from 'src/tickets/ticket.model';
import { IBookedItem } from 'src/bookings/booking.model';
import { Ticket } from 'src/schemas/ticket.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvoiceStatusChangeEvent } from 'src/events/invoice-status-change.event';

@Injectable()
export class InvoicesService {

    constructor(
        @InjectModel(Invoice.name) private model: Model<Invoice>,
        @InjectModel(Booking.name) private bookingsModel: Model<Booking>,
        @InjectModel(Ticket.name) private ticketsModel: Model<Ticket>,
        private readonly eventEmitter: EventEmitter2,

    ) { }

    findAll() {
        return this.model.find();
    }

    findOne(id: string) {
        return this.model.findById(id);
    }

    async update(id: string, dto: UpdateInvoiceDto) {

        if (dto.status !== undefined) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }

    async statusUpdate(id: string, status: 'Paid' | 'Due' | 'Cancelled') {

        if (status !== 'Paid' && status !== 'Due' && status !== 'Cancelled') {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const invoice = await this.model
            .findByIdAndUpdate(id, { status: status }, { new: true });

        const booking = await this.bookingsModel.findById(invoice.bookingId);
        const flightId: string = booking.flightId.toString();
        
        this.eventEmitter.emit('invoice.statusChange', new InvoiceStatusChangeEvent(
            status,
            booking.flightId,
            invoice.bookingId,
            invoice.customerId,
        ));

        return invoice;
    }

    findByFilter(filter: any) {
        return this.model.find({ ...filter });
    }
}
