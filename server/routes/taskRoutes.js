import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateTask, handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, validateTask, handleValidationErrors, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

export default router;
