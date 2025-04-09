import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from "@nestjs/common"
import type { BookingsService } from "./bookings.service"
import type { CreateBookingDto } from "./dto/create-booking.dto"
import type { Booking } from "./schemas/booking.schema"
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard"

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req): Promise<Booking> {
    const clientId = req.user.uid
    return this.bookingsService.create(createBookingDto, clientId)
  }

  @Get()
  async findAll(@Query("clientId") clientId?: string, @Query("operatorId") operatorId?: string): Promise<Booking[]> {
    const filters: any = {}
    if (clientId) filters.clientId = clientId
    if (operatorId) filters.operatorId = operatorId
    return this.bookingsService.findAll(filters)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Booking> {
    return this.bookingsService.findOne(id)
  }

  @Put(":id")
  @UseGuards(FirebaseAuthGuard)
  async update(@Param("id") id: string, @Body() updateData: Partial<Booking>, @Req() req): Promise<Booking> {
    const clientId = req.user.uid
    return this.bookingsService.update(id, updateData, clientId)
  }

  @Delete(":id")
  @UseGuards(FirebaseAuthGuard)
  async cancel(@Param("id") id: string, @Body("reason") reason: string, @Req() req): Promise<Booking> {
    const clientId = req.user.uid
    return this.bookingsService.cancel(id, reason, clientId)
  }

  @Get("client/my-bookings")
  @UseGuards(FirebaseAuthGuard)
  async getMyBookings(@Req() req): Promise<Booking[]> {
    const clientId = req.user.uid
    return this.bookingsService.getClientBookings(clientId)
  }

  @Get("operator/bookings")
  @UseGuards(FirebaseAuthGuard)
  async getOperatorBookings(@Req() req): Promise<Booking[]> {
    const operatorId = req.user.uid
    return this.bookingsService.getOperatorBookings(operatorId)
  }
}
