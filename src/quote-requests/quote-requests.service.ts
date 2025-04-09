import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { type Model, Types } from "mongoose"
import { QuoteRequest, type QuoteRequestDocument } from "./schemas/quote-request.schema"
import type { CreateQuoteRequestDto } from "./dto/create-quote-request.dto"
import { v4 as uuidv4 } from "uuid"
import type { FirebaseService } from "../firebase/firebase.service"

@Injectable()
export class QuoteRequestsService {
  constructor(
    @InjectModel(QuoteRequest.name) private quoteRequestModel: Model<QuoteRequestDocument>,
    private firebaseService: FirebaseService
  ) {}

  async create(createQuoteRequestDto: CreateQuoteRequestDto, clientId: string): Promise<QuoteRequest> {
    // Generate a unique request number
    const requestNumber = `QR-${uuidv4().substring(0, 8)}`.toUpperCase()

    // Set expiration date (default to 7 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    const createdQuoteRequest = new this.quoteRequestModel({
      ...createQuoteRequestDto,
      clientId,
      requestNumber,
      status: "pending",
      expiresAt,
      date: new Date(createQuoteRequestDto.date),
      returnDate: createQuoteRequestDto.returnDate ? new Date(createQuoteRequestDto.returnDate) : null,
    })

    const savedRequest = await createdQuoteRequest.save()

    // Find operators based on the request's country/region
    // This is a simplified version - in a real implementation, you would have more complex logic
    // to determine which operators should be notified based on their service areas
    await this.notifyOperators(savedRequest)

    return savedRequest
  }

  async findAll(clientId?: string): Promise<QuoteRequest[]> {
    const query: any = {}

    if (clientId) {
      query.clientId = clientId
    }

    return this.quoteRequestModel.find(query).populate("quotes").sort({ createdAt: -1 }).exec()
  }

  async findOne(id: string): Promise<QuoteRequest> {
    const isValidId = Types.ObjectId.isValid(id)

    let quoteRequest
    if (isValidId) {
      quoteRequest = await this.quoteRequestModel.findById(id).populate("quotes").exec()
    }

    if (!quoteRequest) {
      // Try to find by request number if not found by ID
      quoteRequest = await this.quoteRequestModel.findOne({ requestNumber: id }).populate("quotes").exec()
    }

    if (!quoteRequest) {
      throw new NotFoundException(`Quote request with ID or number ${id} not found`)
    }

    return quoteRequest
  }

  async update(id: string, updateData: Partial<QuoteRequest>, clientId: string): Promise<QuoteRequest> {
    const quoteRequest = await this.quoteRequestModel.findById(id).exec()

    if (!quoteRequest) {
      throw new NotFoundException(`Quote request with ID ${id} not found`)
    }

    if (quoteRequest.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to update this quote request")
    }

    // If the request already has quotes, we need to notify operators about the changes
    if (quoteRequest.quotes && quoteRequest.quotes.length > 0) {
      // Notify operators about the changes
      await this.notifyOperatorsAboutChanges(quoteRequest, updateData)
    }

    return this.quoteRequestModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async cancel(id: string, clientId: string): Promise<QuoteRequest> {
    const quoteRequest = await this.quoteRequestModel.findById(id).exec()

    if (!quoteRequest) {
      throw new NotFoundException(`Quote request with ID ${id} not found`)
    }

    if (quoteRequest.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to cancel this quote request")
    }

    return this.quoteRequestModel.findByIdAndUpdate(id, { status: "cancelled" }, { new: true }).exec()
  }

  async getClientQuoteRequests(clientId: string): Promise<QuoteRequest[]> {
    return this.quoteRequestModel.find({ clientId }).populate("quotes").sort({ createdAt: -1 }).exec()
  }

  async addQuoteToRequest(quoteRequestId: string, quoteId: Types.ObjectId): Promise<QuoteRequest> {
    return this.quoteRequestModel
      .findByIdAndUpdate(quoteRequestId, { $push: { quotes: quoteId } }, { new: true })
      .exec()
  }

  async acceptQuote(quoteRequestId: string, quoteId: string, clientId: string): Promise<QuoteRequest> {
    const quoteRequest = await this.quoteRequestModel.findById(quoteRequestId).exec()

    if (!quoteRequest) {
      throw new NotFoundException(`Quote request with ID ${quoteRequestId} not found`)
    }

    if (quoteRequest.clientId !== clientId) {
      throw new BadRequestException("You are not authorized to accept quotes for this request")
    }

    if (quoteRequest.status !== "pending") {
      throw new BadRequestException(`Cannot accept quote for a request with status ${quoteRequest.status}`)
    }

    return this.quoteRequestModel
      .findByIdAndUpdate(
        quoteRequestId,
        {
          status: "accepted",
          acceptedQuoteId: new Types.ObjectId(quoteId),
        },
        { new: true },
      )
      .exec()
  }

  private async notifyOperators(quoteRequest: QuoteRequest): Promise<void> {
    try {
      // In a real implementation, you would query your database to find operators
      // that service the regions in the quote request

      // For now, we'll simulate finding operators
      const operators = await this.findRelevantOperators(quoteRequest)

      // Update the quote request with the list of notified operators
      const operatorIds = operators.map((op) => op.id)
      await this.quoteRequestModel.findByIdAndUpdate(quoteRequest._id, { notifiedOperators: operatorIds }).exec()

      // Send notifications to each operator
      // This could be via email, push notification, or other channels
      for (const operator of operators) {
        await this.sendOperatorNotification(operator, quoteRequest)
      }
    } catch (error) {
      console.error("Error notifying operators:", error)
      // In a production environment, you might want to handle this error differently
      // Perhaps retry the notification or log it for manual follow-up
    }
  }

  private async notifyOperatorsAboutChanges(quoteRequest: QuoteRequest, changes: Partial<QuoteRequest>): Promise<void> {
    try {
      // Notify operators who have already submitted quotes about the changes
      // In a real implementation, you would get the operator IDs from the quotes

      // For now, we'll use the notifiedOperators list
      for (const operatorId of quoteRequest.notifiedOperators) {
        await this.sendOperatorChangeNotification(operatorId, quoteRequest, changes)
      }
    } catch (error) {
      console.error("Error notifying operators about changes:", error)
    }
  }

  private async findRelevantOperators(quoteRequest: QuoteRequest): Promise<any[]> {
    // In a real implementation, this would query your database
    // For now, we'll return a mock list
    return [
      { id: "op1", email: "operator1@example.com", name: "Operator 1" },
      { id: "op2", email: "operator2@example.com", name: "Operator 2" },
    ]
  }

  private async sendOperatorNotification(operator: any, quoteRequest: QuoteRequest): Promise<void> {
    // In a real implementation, this would send an email or push notification
    console.log(`Notifying operator ${operator.name} about quote request ${quoteRequest.requestNumber}`)

    // Example of sending an email notification
    // await this.emailService.sendEmail({
    //   to: operator.email,
    //   subject: `New Quote Request: ${quoteRequest.requestNumber}`,
    //   template: 'quote-request-notification',
    //   context: {
    //     operatorName: operator.name,
    //     requestNumber: quoteRequest.requestNumber,
    //     from: quoteRequest.from,
    //     to: quoteRequest.to,
    //     date: quoteRequest.date,
    //     passengers: quoteRequest.passengers
    //   }
    // })
  }

  private async sendOperatorChangeNotification(
    operatorId: string,
    quoteRequest: QuoteRequest,
    changes: Partial<QuoteRequest>,
  ): Promise<void> {
    // In a real implementation, this would send an email or push notification
    console.log(`Notifying operator ${operatorId} about changes to quote request ${quoteRequest.requestNumber}`)

    // Example of sending an email notification
    // await this.emailService.sendEmail({
    //   to: operator.email,
    //   subject: `Changes to Quote Request: ${quoteRequest.requestNumber}`,
    //   template: 'quote-request-changes',
    //   context: {
    //     operatorName: operator.name,
    //     requestNumber: quoteRequest.requestNumber,
    //     changes: changes
    //   }
    // })
  }
}
