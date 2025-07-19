import { Router } from 'express';
import { ConfigController } from '../controllers/config.controller';

const router = Router();

router.get('/firebase', ConfigController.getFirebaseConfig);

export default router;
