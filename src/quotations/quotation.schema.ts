import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IFlight } from "src/flights/flight.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IMoney } from "src/models/money.model";

export type QuotationDocument = HydratedDocument<Quotation>;

@Schema()
export class Quotation{

    @Prop({ required: true })
    quotationNumber: string;

    @Prop({ required: true,  type: mongoose.Schema.Types.ObjectId, ref: 'QuotationRequest' })
    quotationRequestId: string;

    @Prop({ required: true })
    status: 'Accepted' | 'Submitted' | 'Rejected';

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Asset' })
    aircraftId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Operator' })
    operatorId: string;

    @Prop({ required: true })
    flightDuration: number; // Hours

    @Prop({ required: true, type: Object })
    price: IMoney;

    @Prop({ required: true })
    expirationDate: Date;

    @Prop({required: true, type: Object})
    flightDetails: IFlight;

    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);