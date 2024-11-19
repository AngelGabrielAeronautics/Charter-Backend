import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification{

    @Prop({ required: true })
    topic: string;
    
    @Prop({ required: true })
    message: string;
  
    @Prop({ required: true, default: Date.now })
    timestamp: Date;
  
    @Prop({ required: true, })
    module: string;
  
    @Prop({ required: true, default: false })
    read: boolean;
  
    @Prop({ type: [String], required: true })
    recipients: string[];
  
    @Prop({ required: false })
    sender?: string;
  
    @Prop({ type: Object, required: false })
    data?: any; // optional additional data
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);