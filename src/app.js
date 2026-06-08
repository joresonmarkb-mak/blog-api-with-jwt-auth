import express from "express";
import cors from 'cors';
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://your-blog-client.vercel.app'
    ]
    
}));

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/posts",postRouter);

export default app;