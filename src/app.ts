import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment';
import { apiRoutes } from './routes';
import { errorHandler, notFoundHandler } from './middleware';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    
    this.app.use(cors({
      origin: config.NODE_ENV === 'production' ? false : true,
      credentials: true
    }));
    
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    if (config.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }
    
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        timestamp: new Date().toISOString()
      }
    });
    
    this.app.use(limiter);
  }

  private initializeRoutes(): void {
    this.app.use('/', apiRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public getApp(): Application {
    return this.app;
  }

  public listen(): void {
    this.app.listen(config.PORT, () => {
      console.log(` Campus Connect Backend running on port ${config.PORT}`);
      console.log(` Environment: ${config.NODE_ENV}`);
      console.log(` Health check: http://localhost:${config.PORT}/api/${config.API_VERSION}/health`);
    });
  }
}
