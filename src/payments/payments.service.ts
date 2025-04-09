import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { Payment, type PaymentDocument } from "./schemas/payment.schema"
import type { RecordPaymentDto } from "./dto/record-payment.dto"
import type { VerifyPaymentDto } from "./dto/verify-payment.dto"
import type { InvoicesService } from "../invoices/invoices.service"
import type { BookingsService } from "../bookings/bookings.service"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private invoicesService: InvoicesService,
    private bookingsService: BookingsService
  ) {}

  async recordPayment(recordPaymentDto: RecordPaymentDto, clientId: string): Promise<Payment> {
    // Get the invoice to ensure it exists
    const invoice = await this.invoicesService.findOne(recordPaymentDto.invoiceId)

    if (invoice.status !== "pending") {
      throw new BadRequestException(`Cannot record a payment for an invoice with status ${invoice.status}`)
    }

    if (invoice.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to record a payment for this invoice")
    }

    // Generate a unique payment number
    const paymentNumber = `PAY-${uuidv4().substring(0, 8)}`.toUpperCase()

    const createdPayment = new this.paymentModel({
      paymentNumber,
      invoiceId: new Types.ObjectId(recordPaymentDto.invoiceId),
      bookingId: invoice.bookingId,
      clientId,
      amount: recordPaymentDto.amount,
      currency: recordPaymentDto.currency || invoice.currency,
      paymentMethod: recordPaymentDto.paymentMethod,
      paymentDate: new Date(recordPaymentDto.paymentDate),
      bankTransferReference: recordPaymentDto.bankTransferReference,
      bankTransferDate: recordPaymentDto.bankTransferDate ? new Date(recordPaymentDto.bankTransferDate) : undefined,
      status: "pending",
      notes: recordPaymentDto.notes,
    })

    const savedPayment = await createdPayment.save()

    // Add the payment to the invoice
    await this.invoicesService.addPaymentToInvoice(recordPaymentDto.invoiceId, savedPayment._id)

    // Add the payment to the booking
    await this.bookingsService.addPaymentToBooking(invoice.bookingId.toString(), savedPayment._id)

    return savedPayment
  }

  async findAll(filters: any = {}): Promise<Payment[]> {
    return this.paymentModel.find(filters).populate("invoiceId").populate("bookingId").sort({ createdAt: -1 }).exec()
  }

  async findOne(id: string): Promise<Payment> {
    const isValidId = Types.ObjectId.isValid(id)

    let payment
    if (isValidId) {
      payment = await this.paymentModel.findById(id).populate("invoiceId").populate("bookingId").exec()
    }

    if (!payment) {
      // Try to find by payment number if not found by ID
      payment = await this.paymentModel
        .findOne({ paymentNumber: id })
        .populate("invoiceId")
        .populate("bookingId")
        .exec()
    }

    if (!payment) {
      throw new NotFoundException(`Payment with ID or number ${id} not found`)
    }

    return payment
  }

  async verifyPayment(id: string, verifyPaymentDto: VerifyPaymentDto, adminId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).populate("invoiceId").exec()

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`)
    }

    if (payment.status !== "pending") {
      throw new BadRequestException(`Cannot verify a payment with status ${payment.status}`)
    }

    const invoice = payment.invoiceId as any

    // Check if the payment amount matches the invoice amount
    // In a real system, you might allow partial payments
    if (payment.amount !== invoice.amount) {
      throw new BadRequestException(
        `Payment amount (${payment.amount}) does not match invoice amount (${invoice.amount})`,
      )
    }

    // Update the payment status
    const updatedPayment = await this.paymentModel
      .findByIdAndUpdate(
        id,
        {
          status: "verified",
          verifiedBy: adminId,
          verificationDate: new Date(),
          notes: verifyPaymentDto.notes || payment.notes,
        },
        { new: true },
      )
      .exec()

    // Update the invoice status
    await this.invoicesService.updateInvoiceStatus(invoice._id.toString(), "paid")

    // Update the booking status
    await this.bookingsService.updateBookingStatus(payment.bookingId.toString(), "confirmed")

    return updatedPayment
  }

  async rejectPayment(id: string, reason: string, adminId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec()

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`)
    }

    if (payment.status !== "pending") {
      throw new BadRequestException(`Cannot reject a payment with status ${payment.status}`)
    }

    return this.paymentModel
      .findByIdAndUpdate(
        id,
        {
          status: "rejected",
          verifiedBy: adminId,
          verificationDate: new Date(),
          notes: reason,
        },
        { new: true },
      )
      .exec()
  }

  async getClientPayments(clientId: string): Promise<Payment[]> {
    return this.findAll({ clientId })
  }

  async getPendingPayments(): Promise<Payment[]> {
    return this.findAll({ status: "pending" })
  }
}
