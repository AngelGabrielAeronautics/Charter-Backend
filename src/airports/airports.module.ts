import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { Airport, AirportSchema } from 'src/schemas/airport.schema';

@Module({
    imports:[MongooseModule.forFeature([{
        name: Airport.name,
        schema: AirportSchema
    }])],
    controllers: [AirportsController],
    providers: [AirportsService]
})
export class AirportsModule {}
