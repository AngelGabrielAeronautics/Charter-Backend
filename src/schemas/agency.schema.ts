import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAuditFields } from "src/models/audit-fields.model";

export type AgencyDocument = HydratedDocument<Agency>;

@Schema()
export class Agency{
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    country: string;
    
    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    dialCode: string;
    
    @Prop({ required: true })
    phone: string;
    
    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;
}

export const AgenciesSchema = SchemaFactory.createForClass(Agency);