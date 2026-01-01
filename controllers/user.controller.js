import User from "../models/user.model.js";

export const getUsersController = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error);
    }
}

export const getUserController= async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select('-password');
        if(!user){
            throw new Error('User not found');
        }
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error);
    }
}