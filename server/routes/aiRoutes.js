import express from 'express';
import { suggestTasks, summarizeTasks } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateAIGoal, handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/suggest', protect, validateAIGoal, handleValidationErrors, suggestTasks);
router.post('/summarize', protect, summarizeTasks);

export default router;
