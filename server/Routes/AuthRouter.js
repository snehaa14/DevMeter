import { Router } from 'express';
import { signupValidation, loginValidation } from '../Middlewares/AuthValidation.js';
import { signup, login } from '../Controllers/AuthController.js';

const router = Router();

// Signup Route - Use signupValidation middleware
router.post('/signup', signupValidation, signup);

// Login Route - Use loginValidation middleware
router.post('/login', loginValidation, login);

export default router;
