import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { DeadLeg, type DeadLegDocument } from "./schemas/dead-leg.schema"
import type { CreateDeadLegDto } from "./dto/create-dead-leg.dto"
import type { QueryDeadLegsDto } from "./dto/query-dead-legs.dto"
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class DeadLegsService {
  constructor(
    @InjectModel(DeadLeg.name) private deadLegModel: Model<DeadLegDocument>,
  ) {}

  async create(createDeadLegDto: CreateDeadLegDto, operatorId: string): Promise<DeadLeg> {
    // Generate a unique flight number for the dead leg
    const flightNumber = `DL-${operatorId.substring(0, 3)}-${uuidv4().substring(0, 8)}`.toUpperCase()

    const createdDeadLeg = new this.deadLegModel({
      ...createDeadLegDto,
      operatorId,
      flightNumber,
      status: "active",
    })

    return createdDeadLeg.save()
  }

  async findAll(queryDeadLegsDto: QueryDeadLegsDto): Promise<DeadLeg[]> {
    const { from, to, date, operatorId } = queryDeadLegsDto
    const query: any = { status: "active" }

    if (from) {
      query.from = { $regex: new RegExp(from, "i") }
    }

    if (to) {
      query.to = { $regex: new RegExp(to, "i") }
    }

    if (date) {
      // Find dead legs on the specified date or with flexible dates
      const searchDate = new Date(date)
      query.$or = [
        {
          date: {
            $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
            $lt: new Date(searchDate.setHours(23, 59, 59, 999)),
          },
        },
        { dateFlexible: true },
      ]
    }

    if (operatorId) {
      query.operatorId = operatorId
    }

    return this.deadLegModel.find(query).exec()
  }

  async findOne(id: string): Promise<DeadLeg> {
    const deadLeg = await this.deadLegModel.findById(id).exec()
    if (!deadLeg) {
      throw new NotFoundException(`Dead leg with ID ${id} not found`)
    }
    return deadLeg
  }

  async findByFlightNumber(flightNumber: string): Promise<DeadLeg> {
    const deadLeg = await this.deadLegModel.findOne({ flightNumber }).exec()
    if (!deadLeg) {
      throw new NotFoundException(`Dead leg with flight number ${flightNumber} not found`)
    }
    return deadLeg
  }

  async update(id: string, updateData: Partial<DeadLeg>, operatorId: string): Promise<DeadLeg> {
    const deadLeg = await this.deadLegModel.findById(id).exec()

    if (!deadLeg) {
      throw new NotFoundException(`Dead leg with ID ${id} not found`)
    }

    if (deadLeg.operatorId !== operatorId) {
      throw new BadRequestException("You are not authorized to update this dead leg")
    }

    return this.deadLegModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async remove(id: string, operatorId: string): Promise<DeadLeg> {
    const deadLeg = await this.deadLegModel.findById(id).exec()

    if (!deadLeg) {
      throw new NotFoundException(`Dead leg with ID ${id} not found`)
    }

    if (deadLeg.operatorId !== operatorId) {
      throw new BadRequestException("You are not authorized to delete this dead leg")
    }

    // Instead of deleting, we'll mark it as inactive
    return this.deadLegModel.findByIdAndUpdate(id, { status: "inactive" }, { new: true }).exec()
  }

  async getOperatorDeadLegs(operatorId: string): Promise<DeadLeg[]> {
    return this.deadLegModel.find({ operatorId, status: "active" }).exec()
  }
}
