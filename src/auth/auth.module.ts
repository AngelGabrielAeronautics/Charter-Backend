import { Module } from "@nestjs/common"
import { FirebaseAuthGuard } from "./firebase-auth.guard"
import { OperatorGuard } from "./operator.guard"
import { AdminGuard } from "./admin.guard"

@Module({
  providers: [FirebaseAuthGuard, OperatorGuard, AdminGuard],
  exports: [FirebaseAuthGuard, OperatorGuard, AdminGuard],
})
export class AuthModule {}
