import { Module } from '@nestjs/common';
import { QuotationRequestsService } from './quotation-requests.service';
import { QuotationRequestsController } from './quotation-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotationRequest, QuotationRequestSchema } from 'src/quotation-requests/quotation-request.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: QuotationRequest.name,
    schema: QuotationRequestSchema
  }])],  
  providers: [QuotationRequestsService],
  controllers: [QuotationRequestsController]
})
export class QuotationRequestsModule {}
