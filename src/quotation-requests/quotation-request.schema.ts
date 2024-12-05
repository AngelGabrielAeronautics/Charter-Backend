import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAuditFields } from "src/models/audit-fields.model";
import { IUser } from "src/users/user.model";
import { IPassengerCount, ITripLeg } from "./dto/createQuotationRequest2.dto";

export type QuotationRequestDocument = HydratedDocument<QuotationRequest>;

@Schema()
export class QuotationRequest{

    @Prop({ required: true })
    quotationRequestNumber: string; // e.g QR-20240716-010

    @Prop({ required: true })
    status: "Fulfilled" | "Pending" | "Quoted" | "Cancelled";

    @Prop({ required: true })
    customerId: string;

    @Prop({ required: true, type: Object })
    customer: IUser;

    @Prop({ required: true, type: Object })
    numberOfPassengers: IPassengerCount;

    @Prop({ required: true, type: Array })
    trip: ITripLeg[];

    @Prop({ required: true })
    petsAllowed: boolean;

    @Prop({ required: true })
    smokingAllowed: boolean;

    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;
}

export const QuotationRequestSchema = SchemaFactory.createForClass(QuotationRequest);