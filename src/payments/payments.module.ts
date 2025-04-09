import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PaymentsController } from "./payments.controller"
import { PaymentsService } from "./payments.service"
import { Payment, PaymentSchema } from "./schemas/payment.schema"
import { InvoicesModule } from "../invoices/invoices.module"
import { BookingsModule } from "../bookings/bookings.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    InvoicesModule,
    BookingsModule,
    AuthModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
