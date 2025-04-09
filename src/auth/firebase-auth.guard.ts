import { Injectable, type CanActivate, type ExecutionContext, UnauthorizedException } from "@nestjs/common"
import type { Observable } from "rxjs"
import * as admin from "firebase-admin"

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid authorization token")
    }

    const token = authHeader.split("Bearer ")[1]
    return this.validateToken(token, request)
  }

  private async validateToken(token: string, request: any): Promise<boolean> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token)
      request.user = decodedToken
      return true
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token")
    }
  }
}
