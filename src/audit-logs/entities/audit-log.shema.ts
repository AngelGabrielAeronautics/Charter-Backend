import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuditLogDocument = HydratedDocument<AuditLog>;

@Schema()
export class AuditLog {

    @Prop({ required: true })
    action: 'Create' | 'Update' | 'Delete';

    @Prop({ required: true })
    collectionName: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false })
    newValue?: string;

    @Prop({ required: false })
    requestBody?: string;

    @Prop({ required: true })
    documentId: string;
    
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    timestamp: string;

    @Prop({ required: false })
    organisation?: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);