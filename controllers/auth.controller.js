import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import {JWT_SECRET,JWT_EXPIRES_IN} from "../config/env.js";

export const signUpController = async (req,res,next)=>{
    // Start a session means we can run multiple operations in a single transaction 
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create([{name,email,password:hashedPassword}],{session});
        const token = jwt.sign({
            userId:newUser[0]._id
        },JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:{token,user:newUser[0]}
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const signInController = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error('Invalid password');
        }
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{token,user}
        })
    } catch (error) {
        next(error);
    }
}

export const signOutController = async (req,res,next)=>{
    
}