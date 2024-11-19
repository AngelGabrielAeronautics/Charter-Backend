import 'dotenv/config'
import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssetsModule } from './assets/assets.module';
import { OperatorsModule } from './operators/operators.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AirportsModule } from './airports/airports.module';
import { FlightsModule } from './flights/flights.module';
import { TicketsModule } from './tickets/tickets.module';
import { BookingsModule } from './bookings/bookings.module';
import { InvoicesModule } from './invoices/invoices.module';
import { QuotationsModule } from './quotations/quotations.module';
import { QuotationRequestsModule } from './quotation-requests/quotation-requests.module';
import { AgenciesModule } from './agencies/agencies.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AssetsController } from './assets/assets.controller';
import { OperatorsController } from './operators/operators.controller';
import { UsersController } from './users/users.controller';
import { AirportsController } from './airports/airports.controller';
import { FlightsController } from './flights/flights.controller';
import { TicketsController } from './tickets/tickets.controller';
import { BookingsController } from './bookings/bookings.controller';
import { InvoicesController } from './invoices/invoices.controller';
import { QuotationsController } from './quotations/quotations.controller';
import { QuotationRequestsController } from './quotation-requests/quotation-requests.controller';
import { AgenciesController } from './agencies/agencies.controller';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { AuditLogInterceptor } from './interceptors/auditLog.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { NotificationsModule } from './notifications/notifications.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports:
    [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DB_CONNECTION),
      EventEmitterModule.forRoot(),
      ScheduleModule.forRoot(),
      AssetsModule,
      OperatorsModule,
      UsersModule,
      AirportsModule,
      FlightsModule,
      TicketsModule,
      BookingsModule,
      InvoicesModule,
      QuotationsModule,
      QuotationRequestsModule,
      AgenciesModule,
      AuditLogsModule,
      RolePermissionsModule,
      DashboardsModule,
      FirebaseModule,
      NotificationsModule,
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/assets'
      }),
    ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
    NotificationsGateway,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AssetsController,
        OperatorsController,
        UsersController,
        AirportsController,
        FlightsController,
        TicketsController,
        BookingsController,
        InvoicesController,
        QuotationsController,
        QuotationRequestsController,
        AgenciesController,
      );
  }
}
