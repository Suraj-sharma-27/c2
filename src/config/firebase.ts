import admin from 'firebase-admin';
import { config } from './environment';

const firebaseConfig = {
  projectId: config.FIREBASE_PROJECT_ID,
  privateKey: config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: config.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    projectId: config.FIREBASE_PROJECT_ID,
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();
