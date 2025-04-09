import { Injectable, type CanActivate, type ExecutionContext, ForbiddenException } from "@nestjs/common"
import type { Observable } from "rxjs"
import * as admin from "firebase-admin"

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException("User not authenticated")
    }

    return this.validateAdmin(user.uid)
  }

  private async validateAdmin(uid: string): Promise<boolean> {
    try {
      // Get the user's custom claims
      const userRecord = await admin.auth().getUser(uid)
      const customClaims = userRecord.customClaims || {}

      // Check if the user has the admin role
      if (customClaims.role === "admin") {
        return true
      }

      throw new ForbiddenException("User is not an admin")
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error
      }
      throw new ForbiddenException("Failed to validate admin status")
    }
  }
}
