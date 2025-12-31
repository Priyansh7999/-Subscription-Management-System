import {Router} from 'express';

export const subscriptionRouter = Router();

// Get all subscriptions
subscriptionRouter.get('/', (req, res) => {
    res.status(200).json({
        message: "Get all subscriptions"
    });
});

// Get subscription by ID
subscriptionRouter.get('/:id', (req, res) => {
    res.status(200).json({
        message: "Get subscription with ID " + req.params.id
    });
});

// Create a new subscription
subscriptionRouter.post('/', (req, res) => {
    res.status(201).json({
        message: "Create a new subscription"
    });
});

// Update a subscription by ID
subscriptionRouter.put('/:id', (req, res) => {
    res.status(200).json({
        message: "Update subscription with ID " + req.params.id
    });
});

// Delete a subscription by ID
subscriptionRouter.delete('/:id', (req, res) => {
    res.status(200).json({
        message: "Delete subscription with ID " + req.params.id
    });
});

// Get all subscriptions for a specific user
subscriptionRouter.get('/user/:id', (req, res) => {
    res.status(200).json({
        message: "Get subscriptions for user with ID " + req.params.id
    });
});

// Cancel a subscription by ID
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.status(200).json({
        message: "Cancel subscription with ID " + req.params.id
    });
});

// 
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.status(200).json({
        message: "Get upcoming subscription renewals"
    });
});
export default subscriptionRouter;