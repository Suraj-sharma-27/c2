import { Router } from 'express';
import { HealthController } from '../controllers';

const router = Router();

router.get('/health', HealthController.getHealthCheck);

export { router as healthRoutes };
