import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { authRoutes } from './auth.routes';
import configRoutes from './config.routes';
import { config } from '../config/environment';

const router = Router();

router.use(`/api/${config.API_VERSION}`, healthRoutes);
router.use(`/api/${config.API_VERSION}`, authRoutes);
router.use(`/api/${config.API_VERSION}/config`, configRoutes);

export { router as apiRoutes };
