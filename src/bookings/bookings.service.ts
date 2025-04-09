import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { Booking, type BookingDocument } from "./schemas/booking.schema"
import type { CreateBookingDto } from "./dto/create-booking.dto"
import type { QuotesService } from "../quotes/quotes.service"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private quotesService: QuotesService
  ) {}

  async create(createBookingDto: CreateBookingDto, clientId: string): Promise<Booking> {
    // Get the quote to ensure it exists and is accepted
    const quote = await this.quotesService.findOne(createBookingDto.quoteId)

    if (quote.status !== "accepted") {
      throw new BadRequestException("Cannot create a booking for a quote that has not been accepted")
    }

    // Get the quote request details
    const quoteRequest = quote.quoteRequestId as any

    if (quoteRequest.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to create a booking for this quote")
    }

    // Generate a unique booking number
    const bookingNumber = `BK-${uuidv4().substring(0, 8)}`.toUpperCase()

    const createdBooking = new this.bookingModel({
      bookingNumber,
      clientId,
      quoteRequestId: quoteRequest._id,
      quoteId: quote._id,
      operatorId: quote.operatorId,
      from: quoteRequest.from,
      to: quoteRequest.to,
      date: quoteRequest.date,
      returnDate: quoteRequest.returnDate,
      departureTime: quote.departureTime,
      arrivalTime: quote.arrivalTime,
      returnDepartureTime: quote.returnDepartureTime,
      returnArrivalTime: quote.returnArrivalTime,
      passengers: quoteRequest.passengers,
      aircraftType: quote.aircraftType,
      aircraftRegistration: quote.aircraftRegistration,
      totalPrice: quote.price,
      currency: quote.currency || "EUR",
      status: "pending",
      specialRequests: createBookingDto.specialRequests,
      passengerDetails: createBookingDto.passengerDetails,
    })

    return createdBooking.save()
  }

  async findAll(filters: any = {}): Promise<Booking[]> {
    return this.bookingModel
      .find(filters)
      .populate("quoteRequestId")
      .populate("quoteId")
      .populate("invoices")
      .populate("payments")
      .sort({ createdAt: -1 })
      .exec()
  }

  async findOne(id: string): Promise<Booking> {
    const isValidId = Types.ObjectId.isValid(id)

    let booking
    if (isValidId) {
      booking = await this.bookingModel
        .findById(id)
        .populate("quoteRequestId")
        .populate("quoteId")
        .populate("invoices")
        .populate("payments")
        .exec()
    }

    if (!booking) {
      // Try to find by booking number if not found by ID
      booking = await this.bookingModel
        .findOne({ bookingNumber: id })
        .populate("quoteRequestId")
        .populate("quoteId")
        .populate("invoices")
        .populate("payments")
        .exec()
    }

    if (!booking) {
      throw new NotFoundException(`Booking with ID or number ${id} not found`)
    }

    return booking
  }

  async update(id: string, updateData: Partial<Booking>, clientId: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec()

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`)
    }

    if (booking.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to update this booking")
    }

    if (booking.status !== "pending") {
      throw new BadRequestException(`Cannot update a booking with status ${booking.status}`)
    }

    return this.bookingModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async cancel(id: string, reason: string, clientId: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec()

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`)
    }

    if (booking.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to cancel this booking")
    }

    if (booking.status === "cancelled") {
      throw new BadRequestException("This booking is already cancelled")
    }

    if (booking.status === "completed") {
      throw new BadRequestException("Cannot cancel a completed booking")
    }

    return this.bookingModel
      .findByIdAndUpdate(
        id,
        {
          status: "cancelled",
          cancellationReason: reason,
          cancellationDate: new Date(),
        },
        { new: true },
      )
      .exec()
  }

  async getClientBookings(clientId: string): Promise<Booking[]> {
    return this.findAll({ clientId })
  }

  async getOperatorBookings(operatorId: string): Promise<Booking[]> {
    return this.findAll({ operatorId })
  }

  async addInvoiceToBooking(bookingId: string, invoiceId: Types.ObjectId): Promise<Booking> {
    return this.bookingModel.findByIdAndUpdate(bookingId, { $push: { invoices: invoiceId } }, { new: true }).exec()
  }

  async addPaymentToBooking(bookingId: string, paymentId: Types.ObjectId): Promise<Booking> {
    return this.bookingModel.findByIdAndUpdate(bookingId, { $push: { payments: paymentId } }, { new: true }).exec()
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<Booking> {
    return this.bookingModel.findByIdAndUpdate(bookingId, { status }, { new: true }).exec()
  }
}
