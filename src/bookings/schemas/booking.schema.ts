import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type BookingDocument = Booking & Document

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, unique: true })
  bookingNumber: string

  @Prop({ required: true })
  clientId: string

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "QuoteRequest" })
  quoteRequestId: MongooseSchema.Types.ObjectId

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "Quote" })
  quoteId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  operatorId: string

  @Prop({ required: true })
  from: string

  @Prop({ required: true })
  to: string

  @Prop({ required: true })
  date: Date

  @Prop()
  returnDate: Date

  @Prop()
  departureTime: string

  @Prop()
  arrivalTime: string

  @Prop()
  returnDepartureTime: string

  @Prop()
  returnArrivalTime: string

  @Prop({ required: true })
  passengers: number

  @Prop({ required: true })
  aircraftType: string

  @Prop({ required: true })
  aircraftRegistration: string

  @Prop({ required: true })
  totalPrice: number

  @Prop({ default: "EUR" })
  currency: string

  @Prop({ default: "pending" })
  status: string

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Invoice" }] })
  invoices: MongooseSchema.Types.ObjectId[]

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Payment" }] })
  payments: MongooseSchema.Types.ObjectId[]

  @Prop()
  cancellationReason: string

  @Prop()
  cancellationDate: Date

  @Prop()
  specialRequests: string

  @Prop({ type: MongooseSchema.Types.Mixed })
  passengerDetails: Record<string, any>[]

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const BookingSchema = SchemaFactory.createForClass(Booking)
