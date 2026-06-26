import * as admin from 'firebase-admin';
import { env } from '../config/env';

let app: admin.app.App;

if (env.FIREBASE.PROJECT_ID && env.FIREBASE.CLIENT_EMAIL && env.FIREBASE.PRIVATE_KEY) {
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE.PROJECT_ID,
        clientEmail: env.FIREBASE.CLIENT_EMAIL,
        privateKey: env.FIREBASE.PRIVATE_KEY,
      }),
      storageBucket: `${env.FIREBASE.PROJECT_ID}.appspot.com`, // Default bucket name convention
    });
    console.log('Firebase Admin Initialized Successfully');
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
    // Initialize default app for testing without creds if needed, or rethrow
    app = admin.initializeApp();
  }
} else {
  console.warn('Firebase credentials missing. Initializing default app.');
  app = admin.initializeApp();
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
