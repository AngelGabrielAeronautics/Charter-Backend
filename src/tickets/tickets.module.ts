import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from 'src/schemas/ticket.schema';
import { TicketsService } from './tickets.service';
import { Booking, BookingSchema } from 'src/bookings/booking.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {
        name: Ticket.name,
        schema: TicketSchema
      },
      {
        name: Booking.name,
        schema: BookingSchema
      },
    ]
  )],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
