import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAuditFields } from "src/models/audit-fields.model";

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema()
export class Invoice{
    @Prop({ required: true })
    invoiceNumber: string;

    @Prop({ required: true })
    status: 'Paid' | 'Due' | 'Cancelled';

    @Prop({ required: true })
    subTotal: number;

    @Prop({ required: true })
    taxAmount: number;

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: false })
    flightId: string;

    @Prop({ required: true })
    customerId: string;

    @Prop({ required: true })
    bookingId: string;

    @Prop({ required: true })
    dateIssued: Date;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice); 