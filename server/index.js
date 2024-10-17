import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './db/db.js';
import cors from './middleware/cors.js';
import authRoutes from './routes/authRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import listRoutes from './routes/listRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import userRouter from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3044;

app.use(express.json());
app.use(cors);
app.use(cookieParser());
// serve static files -  preffered route / actual folder path
app.use('/images', express.static('statics'));
dotenv.config();
connectDB();

// Routes
app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/api/auth', authRoutes);
app.use('/lists', listRoutes);
app.use('/cards', cardRoutes);
app.use('/comments', commentRoutes);

//Fallback route
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/public/404.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
