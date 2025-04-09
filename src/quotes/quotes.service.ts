import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { Quote, type QuoteDocument } from "./schemas/quote.schema"
import type { CreateQuoteDto } from "./dto/create-quote.dto"
import type { QuoteRequestsService } from "../quote-requests/quote-requests.service"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>,
    private quoteRequestsService: QuoteRequestsService
  ) {}

  async create(createQuoteDto: CreateQuoteDto, operatorId: string): Promise<Quote> {
    // Generate a unique quote number
    const quoteNumber = `QT-${operatorId.substring(0, 3)}-${uuidv4().substring(0, 8)}`.toUpperCase()

    // Set expiration date (default to 7 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    // Verify that the quote request exists
    const quoteRequest = await this.quoteRequestsService.findOne(createQuoteDto.quoteRequestId)

    if (quoteRequest.status !== "pending") {
      throw new BadRequestException(`Cannot submit quote for a request with status ${quoteRequest.status}`)
    }

    const createdQuote = new this.quoteModel({
      ...createQuoteDto,
      quoteNumber,
      operatorId,
      quoteRequestId: new Types.ObjectId(createQuoteDto.quoteRequestId),
      status: "pending",
      expiresAt,
    })

    const savedQuote = await createdQuote.save()

    // Add the quote to the quote request
    await this.quoteRequestsService.addQuoteToRequest(createQuoteDto.quoteRequestId, savedQuote._id)

    return savedQuote
  }

  async findAll(operatorId?: string): Promise<Quote[]> {
    const query: any = {}

    if (operatorId) {
      query.operatorId = operatorId
    }

    return this.quoteModel.find(query).populate("quoteRequestId").sort({ createdAt: -1 }).exec()
  }

  async findOne(id: string): Promise<Quote> {
    const isValidId = Types.ObjectId.isValid(id)

    let quote
    if (isValidId) {
      quote = await this.quoteModel.findById(id).populate("quoteRequestId").exec()
    }

    if (!quote) {
      // Try to find by quote number if not found by ID
      quote = await this.quoteModel.findOne({ quoteNumber: id }).populate("quoteRequestId").exec()
    }

    if (!quote) {
      throw new NotFoundException(`Quote with ID or number ${id} not found`)
    }

    return quote
  }

  async update(id: string, updateData: Partial<Quote>, operatorId: string): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).exec()

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`)
    }

    if (quote.operatorId !== operatorId) {
      throw new BadRequestException("You are not authorized to update this quote")
    }

    if (quote.status !== "pending") {
      throw new BadRequestException(`Cannot update a quote with status ${quote.status}`)
    }

    return this.quoteModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async withdraw(id: string, operatorId: string): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).exec()

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`)
    }

    if (quote.operatorId !== operatorId) {
      throw new BadRequestException("You are not authorized to withdraw this quote")
    }

    if (quote.status !== "pending") {
      throw new BadRequestException(`Cannot withdraw a quote with status ${quote.status}`)
    }

    return this.quoteModel.findByIdAndUpdate(id, { status: "withdrawn" }, { new: true }).exec()
  }

  async getOperatorQuotes(operatorId: string): Promise<Quote[]> {
    return this.quoteModel.find({ operatorId }).populate("quoteRequestId").sort({ createdAt: -1 }).exec()
  }

  async acceptQuote(id: string, clientId: string): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).populate("quoteRequestId").exec()

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`)
    }

    const quoteRequest = quote.quoteRequestId as any

    if (quoteRequest.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to accept this quote")
    }

    if (quote.status !== "pending") {
      throw new BadRequestException(`Cannot accept a quote with status ${quote.status}`)
    }

    // Update the quote request status
    await this.quoteRequestsService.acceptQuote(quoteRequest._id.toString(), id, clientId)

    // Update the quote status
    return this.quoteModel.findByIdAndUpdate(id, { status: "accepted" }, { new: true }).exec()
  }
}
