import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from "@nestjs/common"
import type { QuotesService } from "./quotes.service"
import type { CreateQuoteDto } from "./dto/create-quote.dto"
import type { Quote } from "./schemas/quote.schema"
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard"
import { OperatorGuard } from "../auth/operator.guard"

@Controller("quotes")
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async create(@Body() createQuoteDto: CreateQuoteDto, @Req() req): Promise<Quote> {
    const operatorId = req.user.uid
    return this.quotesService.create(createQuoteDto, operatorId)
  }

  @Get()
  async findAll(@Query("operatorId") operatorId?: string): Promise<Quote[]> {
    return this.quotesService.findAll(operatorId)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Quote> {
    return this.quotesService.findOne(id)
  }

  @Put(":id")
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async update(@Param("id") id: string, @Body() updateData: Partial<Quote>, @Req() req): Promise<Quote> {
    const operatorId = req.user.uid
    return this.quotesService.update(id, updateData, operatorId)
  }

  @Delete(":id")
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async withdraw(@Param("id") id: string, @Req() req): Promise<Quote> {
    const operatorId = req.user.uid
    return this.quotesService.withdraw(id, operatorId)
  }

  @Get("operator/my-quotes")
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async getMyQuotes(@Req() req): Promise<Quote[]> {
    const operatorId = req.user.uid
    return this.quotesService.getOperatorQuotes(operatorId)
  }

  @Post(":id/accept")
  @UseGuards(FirebaseAuthGuard)
  async acceptQuote(@Param("id") id: string, @Req() req): Promise<Quote> {
    const clientId = req.user.uid
    return this.quotesService.acceptQuote(id, clientId)
  }
}
