import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { QuoteRequestsController } from "./quote-requests.controller"
import { QuoteRequestsService } from "./quote-requests.service"
import { QuoteRequest, QuoteRequestSchema } from "./schemas/quote-request.schema"
import { AuthModule } from "../auth/auth.module"
import { FirebaseModule } from "../firebase/firebase.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuoteRequest.name, schema: QuoteRequestSchema }]),
    AuthModule,
    FirebaseModule,
  ],
  controllers: [QuoteRequestsController],
  providers: [QuoteRequestsService],
  exports: [QuoteRequestsService],
})
export class QuoteRequestsModule {}
