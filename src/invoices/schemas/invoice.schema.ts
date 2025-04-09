import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"

export type InvoiceDocument = Invoice & Document

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true, unique: true })
  invoiceNumber: string

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: "Booking" })
  bookingId: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  clientId: string

  @Prop({ required: true })
  operatorId: string

  @Prop({ required: true })
  amount: number

  @Prop({ default: "EUR" })
  currency: string

  @Prop({ required: true })
  dueDate: Date

  @Prop({ default: "pending" })
  status: string

  @Prop()
  paymentInstructions: string

  @Prop()
  bankDetails: {
    bankName: string
    accountHolder: string
    iban: string
    swift: string
    reference: string
  }

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Payment" }] })
  payments: MongooseSchema.Types.ObjectId[]

  @Prop()
  notes: string

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice)
