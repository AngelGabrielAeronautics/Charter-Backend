import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  
    firebaseAuth: any;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.firebaseAuth = this.firebaseApp.auth();
    // console.log(this.firebaseAuth)
  }
}