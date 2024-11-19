import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from 'src/flights/flight.schema';
import { OperatorsModule } from 'src/operators/operators.module';
import { AssetsModule } from 'src/assets/assets.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
            name: Flight.name,
            schema: FlightSchema
        }
    ]), OperatorsModule, AssetsModule, BookingsModule, UsersModule
  ],
  exports: [FlightsService],
  providers: [FlightsService],
  controllers: [FlightsController]
})
export class FlightsModule {}
