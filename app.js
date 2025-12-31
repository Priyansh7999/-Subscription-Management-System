import express from 'express';
import {PORT} from './config/env.js';
const app = express();

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "Welcome to the Subscription Management System"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});