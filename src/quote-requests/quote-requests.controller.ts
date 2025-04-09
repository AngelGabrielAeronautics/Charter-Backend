import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from "@nestjs/common"
import type { QuoteRequestsService } from "./quote-requests.service"
import type { CreateQuoteRequestDto } from "./dto/create-quote-request.dto"
import type { QuoteRequest } from "./schemas/quote-request.schema"
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard"

@Controller("quote-requests")
export class QuoteRequestsController {
  constructor(private readonly quoteRequestsService: QuoteRequestsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(@Body() createQuoteRequestDto: CreateQuoteRequestDto, @Req() req): Promise<QuoteRequest> {
    const clientId = req.user.uid
    return this.quoteRequestsService.create(createQuoteRequestDto, clientId)
  }

  @Get()
  async findAll(@Query("clientId") clientId?: string): Promise<QuoteRequest[]> {
    return this.quoteRequestsService.findAll(clientId)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<QuoteRequest> {
    return this.quoteRequestsService.findOne(id)
  }

  @Put(":id")
  @UseGuards(FirebaseAuthGuard)
  async update(@Param("id") id: string, @Body() updateData: Partial<QuoteRequest>, @Req() req): Promise<QuoteRequest> {
    const clientId = req.user.uid
    return this.quoteRequestsService.update(id, updateData, clientId)
  }

  @Delete(":id")
  @UseGuards(FirebaseAuthGuard)
  async cancel(@Param("id") id: string, @Req() req): Promise<QuoteRequest> {
    const clientId = req.user.uid
    return this.quoteRequestsService.cancel(id, clientId)
  }

  @Get("client/my-requests")
  @UseGuards(FirebaseAuthGuard)
  async getMyQuoteRequests(@Req() req): Promise<QuoteRequest[]> {
    const clientId = req.user.uid
    return this.quoteRequestsService.getClientQuoteRequests(clientId)
  }
}
