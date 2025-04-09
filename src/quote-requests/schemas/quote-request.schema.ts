import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type QuoteRequestDocument = QuoteRequest & Document

@Schema({ timestamps: true })
export class QuoteRequest {
  @Prop({ required: true, unique: true })
  requestNumber: string

  @Prop({ required: true })
  clientId: string

  @Prop({ required: true })
  from: string

  @Prop({ required: true })
  to: string

  @Prop({ required: true })
  date: Date

  @Prop()
  returnDate: Date

  @Prop()
  time: string

  @Prop({ required: true })
  passengers: number

  @Prop({ default: false })
  isFlexibleDate: boolean

  @Prop({ default: false })
  isFlexibleTime: boolean

  @Prop({ default: false })
  isReturnFlight: boolean

  @Prop([String])
  multiCityRoutes: string[]

  @Prop()
  extraBaggage: boolean

  @Prop()
  pets: boolean

  @Prop()
  hardBags: boolean

  @Prop({ type: [{ type: MongooseSchema.Types.Mixed }] })
  extras: Record<string, any>[]

  @Prop({ default: "pending" })
  status: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Quote" }] })
  quotes: MongooseSchema.Types.ObjectId[]

  @Prop()
  expiresAt: Date

  @Prop()
  acceptedQuoteId: MongooseSchema.Types.ObjectId

  @Prop({ type: [String] })
  notifiedOperators: string[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const QuoteRequestSchema = SchemaFactory.createForClass(QuoteRequest)
