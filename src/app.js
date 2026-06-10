import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

const app = express();

app.use(cors()); // ✅ allow all origins temporarily

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

export default app;