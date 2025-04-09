import { Injectable, type OnModuleInit } from "@nestjs/common"
import * as admin from "firebase-admin"

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    // Initialize Firebase Admin SDK if it hasn't been initialized yet
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        // You can also use a service account key file:
        // credential: admin.credential.cert(require('path/to/serviceAccountKey.json')),
      })
    }
  }

  getAuth() {
    return admin.auth()
  }

  getFirestore() {
    return admin.firestore()
  }
}
