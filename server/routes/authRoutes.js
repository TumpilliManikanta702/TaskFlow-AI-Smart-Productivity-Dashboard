import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, registerUser);
router.post('/login', validateLogin, handleValidationErrors, loginUser);

export default router;
