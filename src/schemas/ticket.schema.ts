import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IAuditFields } from "src/models/audit-fields.model";
import { IPerson } from "src/models/person.model";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {

    @Prop({ required: true })
    ticketNumber: string;

    @Prop({ required: true })
    customerId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Booking' })
    bookingId: string;

    @Prop({ required: true })
    invoiceId: string;

    @Prop({ required: true })
    operatorId: string;
    
    @Prop({ required: false })
    agencyId?: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Flight' })
    flightId: string;

    @Prop({ required: false, })
    pdfFile?: string;

    @Prop({ required: false, type: Object })
    passengerDetails?: IPerson;

    @Prop({ required: false, type: Object })
    auditFields: IAuditFields;

}

export const TicketSchema = SchemaFactory.createForClass(Ticket);