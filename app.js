import express from 'express';
import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import { connectDB } from './config/db.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
// Initialize express app
const app = express();

// Connect to Database
await connectDB();

// Middlewares
app.use(express.json()); // middleware to parse JSON requests.
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded requests.
app.use(cookieParser()); // middleware to parse cookies

// Routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

// Global Error Handling Middleware (should be the place after all routes)
app.use(errorMiddleware);

// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});