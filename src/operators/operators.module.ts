import { Module } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { OperatorsController } from './operators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operator, OperatorSchema } from 'src/schemas/operator.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Operator.name,
    schema: OperatorSchema
  }])],
  exports: [OperatorsService],
  controllers: [OperatorsController],
  providers: [OperatorsService],
})
export class OperatorsModule { }
