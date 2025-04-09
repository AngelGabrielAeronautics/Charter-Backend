import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type QuoteDocument = Quote & Document

@Schema({ timestamps: true })
export class Quote {
  @Prop({ required: true, unique: true })
  quoteNumber: string

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "QuoteRequest" })
  quoteRequestId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  operatorId: string

  @Prop({ required: true })
  operatorQuoteNumber: string

  @Prop({ required: true })
  aircraftRegistration: string

  @Prop({ required: true })
  aircraftType: string

  @Prop({ required: true })
  price: number

  @Prop()
  currency: string

  @Prop({ default: "pending" })
  status: string

  @Prop()
  departureTime: string

  @Prop()
  arrivalTime: string

  @Prop()
  returnDepartureTime: string

  @Prop()
  returnArrivalTime: string

  @Prop()
  technicalStops: string[]

  @Prop()
  responseMessage: string

  @Prop()
  responseType: string

  @Prop()
  expiresAt: Date

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const QuoteSchema = SchemaFactory.createForClass(Quote)
