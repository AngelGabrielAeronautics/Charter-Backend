import { Module } from '@nestjs/common';
import { QuotationRequestsService } from './quotation-requests.service';
import { QuotationRequestsController } from './quotation-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotationRequest, QuotationRequestSchema } from 'src/quotation-requests/quotation-request.schema';
import { UsersModule } from 'src/users/users.module';
import { NumberGeneratorModule } from 'src/modules/number-generator.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: QuotationRequest.name,
    schema: QuotationRequestSchema
  }]), UsersModule, NumberGeneratorModule],
  providers: [QuotationRequestsService],
  controllers: [QuotationRequestsController]
})
export class QuotationRequestsModule { }
