import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from "@nestjs/common"
import type { DeadLegsService } from "./dead-legs.service"
import type { CreateDeadLegDto } from "./dto/create-dead-leg.dto"
import type { QueryDeadLegsDto } from "./dto/query-dead-legs.dto"
import type { DeadLeg } from "./schemas/dead-leg.schema"
import { FirebaseAuthGuard } from "../auth/firebase-auth.guard"
import { OperatorGuard } from "../auth/operator.guard"

@Controller("dead-legs")
export class DeadLegsController {
  constructor(private readonly deadLegsService: DeadLegsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async create(@Body() createDeadLegDto: CreateDeadLegDto, @Req() req): Promise<DeadLeg> {
    const operatorId = req.user.uid
    return this.deadLegsService.create(createDeadLegDto, operatorId)
  }

  @Get()
  async findAll(@Query() queryDeadLegsDto: QueryDeadLegsDto): Promise<DeadLeg[]> {
    return this.deadLegsService.findAll(queryDeadLegsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DeadLeg> {
    return this.deadLegsService.findOne(id);
  }

  @Get('flight/:flightNumber')
  async findByFlightNumber(@Param('flightNumber') flightNumber: string): Promise<DeadLeg> {
    return this.deadLegsService.findByFlightNumber(flightNumber);
  }

  @Put(":id")
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async update(@Param('id') id: string, @Body() updateData: Partial<DeadLeg>, @Req() req): Promise<DeadLeg> {
    const operatorId = req.user.uid
    return this.deadLegsService.update(id, updateData, operatorId)
  }

  @Delete(":id")
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async remove(@Param('id') id: string, @Req() req): Promise<DeadLeg> {
    const operatorId = req.user.uid
    return this.deadLegsService.remove(id, operatorId)
  }

  @Get('operator/my-listings')
  @UseGuards(FirebaseAuthGuard, OperatorGuard)
  async getMyDeadLegs(@Req() req): Promise<DeadLeg[]> {
    const operatorId = req.user.uid;
    return this.deadLegsService.getOperatorDeadLegs(operatorId);
  }
}
