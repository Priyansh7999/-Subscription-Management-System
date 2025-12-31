import { Router } from "express";

const userRouter = Router();

// Get all users
userRouter.get('/', (req, res) => {
    res.status(200).json({
        message: "Get all users"
    })
});

// Get user by ID
userRouter.get('/:id', (req, res) => {
    res.status(200).json({
        message: "Get user with ID " + req.params.id
    })
});

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