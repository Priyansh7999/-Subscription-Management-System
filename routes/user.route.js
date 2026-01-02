import { Router } from "express";
import { getUserController, getUsersController } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
import { errorMiddleware } from "../middlewares/error.middleware.js";

const userRouter = Router();

// Get all users

userRouter.get('/', authorize, getUsersController);

// Get user by ID
userRouter.get('/:id', authorize,  getUserController);

// Create new user
userRouter.post('/', (req, res) => {
    res.status(201).json({
        message: "Create new user"
    });
});

// Update user
userRouter.put('/', (req, res) => {
    res.status(200).json({
        message: "Update user"
    });
});

// Delete user by ID
userRouter.delete('/:id', (req, res) => {
    res.status(200).json({
        message: "Delete user with ID " + req.params.id
    });
});


export default userRouter;