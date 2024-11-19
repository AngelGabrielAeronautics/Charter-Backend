import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define the AuditFields schema
@Schema({ _id: false }) // _id: false makes this a sub-document
export class AuditFields {
  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  createdById: string;

  @Prop({ required: true, default: new Date })
  dateCreated: Date;

  @Prop()
  modifiedBy?: string;

  @Prop()
  modifiedById?: string;

  @Prop()
  dateModified?: Date;
}

export const AuditFieldsSchema = SchemaFactory.createForClass(AuditFields);