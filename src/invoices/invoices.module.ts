import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { InvoicesController } from "./invoices.controller"
import { InvoicesService } from "./invoices.service"
import { Invoice, InvoiceSchema } from "./schemas/invoice.schema"
import { BookingsModule } from "../bookings/bookings.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]), BookingsModule, AuthModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
