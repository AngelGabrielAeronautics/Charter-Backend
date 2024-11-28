import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyCount, DailyCountSchema } from 'src/schemas/daily-count.schema';
import { NumberGeneratorService } from 'src/services/number-generator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DailyCount.name, schema: DailyCountSchema }]),
  ],
  providers: [NumberGeneratorService],
  exports: [NumberGeneratorService],
})
export class NumberGeneratorModule { }
