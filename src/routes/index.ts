import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { config } from '../config/environment';

const router = Router();

router.use(`/api/${config.API_VERSION}`, healthRoutes);

export { router as apiRoutes };
