import {Router} from 'express';

// const router = express.Router();
const authRouter=Router();

authRouter.post('/sign-up',(req,res)=>{
    res.send('User signed up');
});

authRouter.post('/sign-in',(req,res)=>{
    res.send('User signed in');
});
authRouter.post('/sign-out',(req,res)=>{
    res.send('User signed out');
});

export default authRouter;