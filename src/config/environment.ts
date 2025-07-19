export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  API_VERSION: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MEASUREMENT_ID: string;
}

export const config: EnvConfig = {
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PORT: parseInt(process.env['PORT'] || '3002', 10),
  API_VERSION: process.env['API_VERSION'] || 'v1',
  FIREBASE_PROJECT_ID: process.env['FIREBASE_PROJECT_ID'] || '',
  FIREBASE_PRIVATE_KEY: process.env['FIREBASE_PRIVATE_KEY'] || '',
  FIREBASE_CLIENT_EMAIL: process.env['FIREBASE_CLIENT_EMAIL'] || '',
  FIREBASE_API_KEY: process.env['FIREBASE_API_KEY'] || '',
  FIREBASE_AUTH_DOMAIN: process.env['FIREBASE_AUTH_DOMAIN'] || '',
  FIREBASE_STORAGE_BUCKET: process.env['FIREBASE_STORAGE_BUCKET'] || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env['FIREBASE_MESSAGING_SENDER_ID'] || '',
  FIREBASE_APP_ID: process.env['FIREBASE_APP_ID'] || '',
  FIREBASE_MEASUREMENT_ID: process.env['FIREBASE_MEASUREMENT_ID'] || ''
};
