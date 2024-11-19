import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { IBookedItem } from "src/bookings/booking.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IUser } from "src/users/user.model";

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {

    @Prop({ required: false })
    bookingNumber: string;

    @Prop({ required: true, type: Object })
    customer: IUser;

    @Prop({ required: true })
    numberOfPassengers: number;

    @Prop({ required: false })
    flightNumber: string;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Flight' })
    flightId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Operator' })
    operatorId: string;

    @Prop({ required: false })
    agencyId?: string;

    @Prop({ required: true })
    operatorName: string;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' })
    invoiceId: string;

    @Prop({ required: true })
    status: 'Pending' | 'Invoiced' | 'Paid' | 'Cancelled';

    @Prop({ required: true, type: Object })
    items: IBookedItem[];

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true })
    subTotal: number;

    @Prop({ required: true })
    taxAmount: number;

    @Prop({ required: true })
    totalAmount: number;

    @Prop({required: false})
    platformFee?: number;

    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);