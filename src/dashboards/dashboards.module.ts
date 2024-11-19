import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from 'src/flights/flight.schema';
import { Asset, AssetSchema } from 'src/schemas/asset.schema';
import { Quotation, QuotationSchema } from 'src/quotations/quotation.schema';
import { Booking, BookingSchema } from 'src/bookings/booking.schema';
import { Operator, OperatorSchema } from 'src/schemas/operator.schema';
import { QuotationRequest, QuotationRequestSchema } from 'src/quotation-requests/quotation-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flight.name,
        schema: FlightSchema
      },
      {
        name: Asset.name,
        schema: AssetSchema
      },
      {
        name: QuotationRequest.name,
        schema: QuotationRequestSchema
      },
      {
        name: Quotation.name,
        schema: QuotationSchema
      },
      {
        name: Booking.name,
        schema: BookingSchema
      },
      {
        name: Operator.name,
        schema: OperatorSchema
      }
  ]),
  ],
  controllers: [DashboardsController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
