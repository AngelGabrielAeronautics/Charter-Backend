import { Controller, Get, Post, Body, Param, Put, UseGuards, Req, Query } from "@nestjs/common"
import type { PaymentsService } from "./payments.service"
import type { RecordPaymentDto } from "./dto/record-payment.dto"
import type { VerifyPaymentDto } from "./dto/verify-payment.dto"
import type { Payment } from "./schemas/payment.schema"
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard"
import { AdminGuard } from "../auth/admin.guard"

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async recordPayment(@Body() recordPaymentDto: RecordPaymentDto, @Req() req): Promise<Payment> {
    const clientId = req.user.uid
    return this.paymentsService.recordPayment(recordPaymentDto, clientId)
  }

  @Get()
  async findAll(@Query("clientId") clientId?: string, @Query("status") status?: string): Promise<Payment[]> {
    const filters: any = {}
    if (clientId) filters.clientId = clientId
    if (status) filters.status = status
    return this.paymentsService.findAll(filters)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Payment> {
    return this.paymentsService.findOne(id)
  }

  @Put(":id/verify")
  @UseGuards(FirebaseAuthGuard, AdminGuard)
  async verifyPayment(
    @Param("id") id: string,
    @Body() verifyPaymentDto: VerifyPaymentDto,
    @Req() req,
  ): Promise<Payment> {
    const adminId = req.user.uid
    return this.paymentsService.verifyPayment(id, verifyPaymentDto, adminId)
  }

  @Put(":id/reject")
  @UseGuards(FirebaseAuthGuard, AdminGuard)
  async rejectPayment(@Param("id") id: string, @Body("reason") reason: string, @Req() req): Promise<Payment> {
    const adminId = req.user.uid
    return this.paymentsService.rejectPayment(id, reason, adminId)
  }

  @Get("client/my-payments")
  @UseGuards(FirebaseAuthGuard)
  async getMyPayments(@Req() req): Promise<Payment[]> {
    const clientId = req.user.uid
    return this.paymentsService.getClientPayments(clientId)
  }

  @Get("admin/pending-payments")
  @UseGuards(FirebaseAuthGuard, AdminGuard)
  async getPendingPayments(): Promise<Payment[]> {
    return this.paymentsService.getPendingPayments()
  }
}
