import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/bookings/booking.schema';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Invoice, InvoiceSchema } from 'src/schemas/invoice.schema';
import { Operator, OperatorSchema } from 'src/schemas/operator.schema';
import { Flight, FlightSchema } from 'src/flights/flight.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {
                name: Booking.name,
                schema: BookingSchema
            },
            {
                name: Invoice.name,
                schema: InvoiceSchema
            },
            {
                name: Operator.name,
                schema: OperatorSchema
            },
            {
                name: Flight.name,
                schema: FlightSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ]
    )],
    exports: [BookingsService],
    controllers: [BookingsController],
    providers: [BookingsService],
})
export class BookingsModule {}
