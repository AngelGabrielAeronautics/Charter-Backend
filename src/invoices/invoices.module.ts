import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/bookings/booking.schema';
import { Invoice, InvoiceSchema } from 'src/schemas/invoice.schema';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Ticket, TicketSchema } from 'src/schemas/ticket.schema';

@Module({
    imports: [MongooseModule.forFeature(
      [
        {
          name: Invoice.name,
          schema: InvoiceSchema
        },
        {
          name: Booking.name,
          schema: BookingSchema
        },
        {
          name: Ticket.name,
          schema: TicketSchema
        }
      ]
    )],
    providers: [InvoicesService],
    controllers: [InvoicesController],
})
export class InvoicesModule {}
