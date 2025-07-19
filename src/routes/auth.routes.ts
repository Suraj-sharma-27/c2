import { Router } from 'express';
import { AuthController } from '../controllers';

const router = Router();

router.post('/signup/admin/google', AuthController.adminGoogleSignup);
router.post('/signup/student', AuthController.signupStudent);
router.post('/login/admin', AuthController.adminLogin);
router.post('/login/student', AuthController.studentLogin);

export { router as authRoutes };
