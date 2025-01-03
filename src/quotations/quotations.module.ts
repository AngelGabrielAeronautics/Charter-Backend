import { Module } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quotation, QuotationSchema } from 'src/quotations/quotation.schema';
import { NumberGeneratorModule } from 'src/modules/number-generator.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Quotation.name,
    schema: QuotationSchema
  }]), NumberGeneratorModule],
  providers: [QuotationsService],
  controllers: [QuotationsController]
})
export class QuotationsModule {}
