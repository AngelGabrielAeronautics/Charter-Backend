import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { QuotesController } from "./quotes.controller"
import { QuotesService } from "./quotes.service"
import { Quote, QuoteSchema } from "./schemas/quote.schema"
import { QuoteRequestsModule } from "../quote-requests/quote-requests.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]), QuoteRequestsModule, AuthModule],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
