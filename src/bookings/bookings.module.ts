import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { BookingsController } from "./bookings.controller"
import { BookingsService } from "./bookings.service"
import { Booking, BookingSchema } from "./schemas/booking.schema"
import { QuotesModule } from "../quotes/quotes.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), QuotesModule, AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
