import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type PaymentDocument = Payment & Document

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, unique: true })
  paymentNumber: string

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "Invoice" })
  invoiceId: MongooseSchema.Types.ObjectId

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "Booking" })
  bookingId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  clientId: string

  @Prop({ required: true })
  amount: number

  @Prop({ default: "EUR" })
  currency: string

  @Prop({ required: true })
  paymentMethod: string

  @Prop()
  paymentDate: Date

  @Prop()
  bankTransferReference: string

  @Prop()
  bankTransferDate: Date

  @Prop()
  verifiedBy: string

  @Prop()
  verificationDate: Date

  @Prop({ default: "pending" })
  status: string

  @Prop()
  notes: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
