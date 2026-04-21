import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { authLimiter, generalLimiter, aiLimiter } from './middleware/rateLimitMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: "*", // later you can restrict to Vercel URL
  credentials: true
}));
app.use(express.json());

// Rate limiting
app.use(generalLimiter);

// Routes with specific rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);

app.get('/', (req, res) => {
  res.send('TaskFlow AI API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
