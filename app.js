import express from 'express';
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import subscriptionRouter from './routes/subscription.route.js';

const app = express();
app.use(express.json());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});