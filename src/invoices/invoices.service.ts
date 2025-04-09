import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { Invoice, type InvoiceDocument } from "./schemas/invoice.schema"
import type { CreateInvoiceDto } from "./dto/create-invoice.dto"
import type { BookingsService } from "../bookings/bookings.service"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    private bookingsService: BookingsService
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, adminId: string): Promise<Invoice> {
    // Get the booking to ensure it exists
    const booking = await this.bookingsService.findOne(createInvoiceDto.bookingId)

    if (booking.status !== "pending" && booking.status !== "confirmed") {
      throw new BadRequestException(`Cannot create an invoice for a booking with status ${booking.status}`)
    }

    // Generate a unique invoice number
    const invoiceNumber = `INV-${uuidv4().substring(0, 8)}`.toUpperCase()

    const createdInvoice = new this.invoiceModel({
      invoiceNumber,
      bookingId: new Types.ObjectId(createInvoiceDto.bookingId),
      clientId: booking.clientId,
      operatorId: booking.operatorId,
      amount: createInvoiceDto.amount,
      currency: createInvoiceDto.currency || booking.currency || "EUR",
      dueDate: new Date(createInvoiceDto.dueDate),
      status: "pending",
      paymentInstructions: createInvoiceDto.paymentInstructions,
      bankDetails: createInvoiceDto.bankDetails,
      notes: createInvoiceDto.notes,
    })

    const savedInvoice = await createdInvoice.save()

    // Add the invoice to the booking
    await this.bookingsService.addInvoiceToBooking(createInvoiceDto.bookingId, savedInvoice._id)

    return savedInvoice
  }

  async findAll(filters: any = {}): Promise<Invoice[]> {
    return this.invoiceModel.find(filters).populate("bookingId").populate("payments").sort({ createdAt: -1 }).exec()
  }

  async findOne(id: string): Promise<Invoice> {
    const isValidId = Types.ObjectId.isValid(id)

    let invoice
    if (isValidId) {
      invoice = await this.invoiceModel.findById(id).populate("bookingId").populate("payments").exec()
    }

    if (!invoice) {
      // Try to find by invoice number if not found by ID
      invoice = await this.invoiceModel.findOne({ invoiceNumber: id }).populate("bookingId").populate("payments").exec()
    }

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID or number ${id} not found`)
    }

    return invoice
  }

  async update(id: string, updateData: Partial<Invoice>, adminId: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id).exec()

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`)
    }

    if (invoice.status !== "pending") {
      throw new BadRequestException(`Cannot update an invoice with status ${invoice.status}`)
    }

    return this.invoiceModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async cancel(id: string, adminId: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id).exec()

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`)
    }

    if (invoice.status === "cancelled") {
      throw new BadRequestException("This invoice is already cancelled")
    }

    if (invoice.status === "paid") {
      throw new BadRequestException("Cannot cancel a paid invoice")
    }

    return this.invoiceModel.findByIdAndUpdate(id, { status: "cancelled" }, { new: true }).exec()
  }

  async getClientInvoices(clientId: string): Promise<Invoice[]> {
    return this.findAll({ clientId })
  }

  async getOperatorInvoices(operatorId: string): Promise<Invoice[]> {
    return this.findAll({ operatorId })
  }

  async addPaymentToInvoice(invoiceId: string, paymentId: Types.ObjectId): Promise<Invoice> {
    return this.invoiceModel.findByIdAndUpdate(invoiceId, { $push: { payments: paymentId } }, { new: true }).exec()
  }

  async updateInvoiceStatus(invoiceId: string, status: string): Promise<Invoice> {
    return this.invoiceModel.findByIdAndUpdate(invoiceId, { status }, { new: true }).exec()
  }
}
