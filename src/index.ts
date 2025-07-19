import 'dotenv/config';
import { App } from './app';

// Create app instance
const app = new App();

// Export for Firebase Functions
export const api = app.getApp();

// For local development
if (require.main === module) {
  app.listen();
}

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log(' SIGINT received, shutting down gracefully');
  process.exit(0);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error(' Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  console.error(' Uncaught Exception:', error);
  process.exit(1);
});
