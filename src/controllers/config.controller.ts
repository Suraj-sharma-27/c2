import { Request, Response } from 'express';
import { config } from '../config/environment';

export class ConfigController {
  static async getFirebaseConfig(_req: Request, res: Response): Promise<void> {
    try {
      const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        authDomain: config.FIREBASE_AUTH_DOMAIN,
        projectId: config.FIREBASE_PROJECT_ID,
        storageBucket: config.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
        appId: config.FIREBASE_APP_ID,
        measurementId: config.FIREBASE_MEASUREMENT_ID
      };

      res.status(200).json({
        success: true,
        data: firebaseConfig
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve Firebase configuration',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
