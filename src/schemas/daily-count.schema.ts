import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DailyCount extends Document {
  @Prop({ required: true, unique: true }) // Format: YYYY-MM-DD
  date: string;

  @Prop({ default: 0 })
  bookingCount: number;

  @Prop({ default: 0 })
  invoiceCount: number;

  @Prop({ default: 0 })
  quotationCount: number;

  @Prop({ default: 0 })
  quotationRequestCount: number;
}

export const DailyCountSchema = SchemaFactory.createForClass(DailyCount);
