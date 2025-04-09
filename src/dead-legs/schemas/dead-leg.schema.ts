import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type DeadLegDocument = DeadLeg & Document

@Schema({ timestamps: true })
export class DeadLeg {
  @Prop({ required: true })
  flightNumber: string

  @Prop({ required: true })
  operatorId: string

  @Prop({ required: true })
  aircraftRegistration: string

  @Prop({ required: true })
  manufacturer: string

  @Prop({ required: true })
  model: string

  @Prop({ required: true })
  from: string

  @Prop({ required: true })
  to: string

  @Prop({ default: false })
  flexibleRouting: boolean

  @Prop({ required: true })
  date: Date

  @Prop({ required: true })
  departureTime: string

  @Prop({ required: true })
  flightDuration: number

  @Prop({ default: false })
  dateFlexible: boolean

  @Prop({ default: false })
  departureTimeFlexible: boolean

  @Prop({ required: true })
  offerExpiresHours: number

  @Prop({ required: true })
  maxSeatsAvailable: number

  @Prop({ required: true })
  maxLuggagePerPassenger: number

  @Prop({ required: true })
  pricePerSeat: number

  @Prop()
  notes: string

  @Prop({ default: "active" })
  status: string

  @Prop()
  aircraftImage: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Booking" }] })
  bookings: MongooseSchema.Types.ObjectId[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const DeadLegSchema = SchemaFactory.createForClass(DeadLeg)
