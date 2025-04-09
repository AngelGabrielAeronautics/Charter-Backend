import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { DeadLegsModule } from "./dead-legs/dead-legs.module"
import { QuoteRequestsModule } from "./quote-requests/quote-requests.module"
import { QuotesModule } from "./quotes/quotes.module"
import { BookingsModule } from "./bookings/bookings.module"
import { InvoicesModule } from "./invoices/invoices.module"
import { PaymentsModule } from "./payments/payments.module"
import { AuthModule } from "./auth/auth.module"
import { FirebaseModule } from "./firebase/firebase.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    FirebaseModule,
    AuthModule,
    DeadLegsModule,
    QuoteRequestsModule,
    QuotesModule,
    BookingsModule,
    InvoicesModule,
    PaymentsModule,
  ],
})
export class AppModule {}
