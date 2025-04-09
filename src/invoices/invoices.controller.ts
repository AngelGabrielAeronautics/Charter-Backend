import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from "@nestjs/common"
import type { InvoicesService } from "./invoices.service"
import type { CreateInvoiceDto } from "./dto/create-invoice.dto"
import type { Invoice } from "./schemas/invoice.schema"
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard"
import { AdminGuard } from "../auth/admin.guard"

@Controller("invoices")
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard, AdminGuard)
  async create(@Body() createInvoiceDto: CreateInvoiceDto, @Req() req): Promise<Invoice> {
    const adminId = req.user.uid
    return this.invoicesService.create(createInvoiceDto, adminId)
  }

  @Get()
  async findAll(@Query("clientId") clientId?: string, @Query("operatorId") operatorId?: string): Promise<Invoice[]> {
    const filters: any = {}
    if (clientId) filters.clientId = clientId
    if (operatorId) filters.operatorId = operatorId
    return this.invoicesService.findAll(filters)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Invoice> {
    return this.invoicesService.findOne(id)
  }

  @Put(":id")
  @UseGuards(FirebaseAuthGuard, AdminGuard)
  async update(@Param("id") id: string, @Body() updateData: Partial<Invoice>, @Req() req): Promise<Invoice> {
    const adminId = req.user.uid
    return this.invoicesService.update(id, updateData, adminId)
  }

  @Delete(":id")
  @UseGuards(FirebaseAuthGuard, AdminGuard)
  async cancel(@Param("id") id: string, @Req() req): Promise<Invoice> {
    const adminId = req.user.uid
    return this.invoicesService.cancel(id, adminId)
  }

  @Get("client/my-invoices")
  @UseGuards(FirebaseAuthGuard)
  async getMyInvoices(@Req() req): Promise<Invoice[]> {
    const clientId = req.user.uid
    return this.invoicesService.getClientInvoices(clientId)
  }

  @Get("operator/invoices")
  @UseGuards(FirebaseAuthGuard)
  async getOperatorInvoices(@Req() req): Promise<Invoice[]> {
    const operatorId = req.user.uid
    return this.invoicesService.getOperatorInvoices(operatorId)
  }
}
