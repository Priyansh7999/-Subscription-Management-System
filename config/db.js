import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "./env.js"
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}
export const connectDB = async () => {
    const uri = MONGODB_URI;
    await mongoose.connect(uri).then(() => {
        console.log("Connected to database in " + NODE_ENV + " mode");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}