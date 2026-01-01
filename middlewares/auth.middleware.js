import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

// someone is making a request get user details -> authorize middleware -> verify ->next -> get user details
export const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            throw new Error("Unauthorized user");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error("Unauthorized user");
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}