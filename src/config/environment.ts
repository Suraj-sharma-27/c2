import * as functions from 'firebase-functions';

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

// Check if running in Firebase Functions environment
const isFirebaseFunction = process.env['FUNCTION_NAME'] || process.env['FUNCTIONS_EMULATOR'];

let config: EnvConfig;

if (isFirebaseFunction) {
  // Running in Firebase Functions - use functions.config()
  const fbConfig = functions.config() as any;
  
  config = {
    NODE_ENV: fbConfig['app']?.['node_env'] || 'production',
    PORT: parseInt(fbConfig['app']?.['port'] || '3001', 10),
    API_VERSION: fbConfig['app']?.['api_version'] || 'v1',
    
    // Firebase Admin SDK
    FIREBASE_PROJECT_ID: fbConfig['firebase']?.['project_id'] || '',
    FIREBASE_PRIVATE_KEY: (fbConfig['firebase']?.['private_key'] || '').replace(/\\n/g, '\n'),
    FIREBASE_CLIENT_EMAIL: fbConfig['firebase']?.['client_email'] || '',
    
    // Firebase Web SDK
    FIREBASE_API_KEY: fbConfig['firebase']?.['web_api_key'] || '',
    FIREBASE_AUTH_DOMAIN: fbConfig['firebase']?.['auth_domain'] || '',
    FIREBASE_STORAGE_BUCKET: fbConfig['firebase']?.['storage_bucket'] || '',
    FIREBASE_MESSAGING_SENDER_ID: fbConfig['firebase']?.['messaging_sender_id'] || '',
    FIREBASE_APP_ID: fbConfig['firebase']?.['app_id'] || '',
    FIREBASE_MEASUREMENT_ID: fbConfig['firebase']?.['measurement_id'] || '',
  };
} else {
  // Running locally - use dotenv
  if (typeof require !== 'undefined') {
    require('dotenv').config();
  }
  
  config = {
    NODE_ENV: process.env['NODE_ENV'] || 'development',
    PORT: parseInt(process.env['PORT'] || '3001', 10),
    API_VERSION: process.env['API_VERSION'] || 'v1',
    
    FIREBASE_PROJECT_ID: process.env['FIREBASE_PROJECT_ID'] || '',
    FIREBASE_PRIVATE_KEY: (process.env['FIREBASE_PRIVATE_KEY'] || '').replace(/\\n/g, '\n'),
    FIREBASE_CLIENT_EMAIL: process.env['FIREBASE_CLIENT_EMAIL'] || '',
    
    FIREBASE_API_KEY: process.env['FIREBASE_API_KEY'] || '',
    FIREBASE_AUTH_DOMAIN: process.env['FIREBASE_AUTH_DOMAIN'] || '',
    FIREBASE_STORAGE_BUCKET: process.env['FIREBASE_STORAGE_BUCKET'] || '',
    FIREBASE_MESSAGING_SENDER_ID: process.env['FIREBASE_MESSAGING_SENDER_ID'] || '',
    FIREBASE_APP_ID: process.env['FIREBASE_APP_ID'] || '',
    FIREBASE_MEASUREMENT_ID: process.env['FIREBASE_MEASUREMENT_ID'] || '',
  };
}

export { config };
