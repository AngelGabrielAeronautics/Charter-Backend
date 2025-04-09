import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { DeadLegsController } from "./dead-legs.controller"
import { DeadLegsService } from "./dead-legs.service"
import { DeadLeg, DeadLegSchema } from "./schemas/dead-leg.schema"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [MongooseModule.forFeature([{ name: DeadLeg.name, schema: DeadLegSchema }]), AuthModule],
  controllers: [DeadLegsController],
  providers: [DeadLegsService],
  exports: [DeadLegsService],
})
export class DeadLegsModule {}
