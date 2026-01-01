import {Router} from 'express';
import { signInController, signOutController, signUpController } from '../controllers/auth.controller.js';

// const router = express.Router();
const authRouter=Router();

authRouter.post('/sign-up',signUpController);

authRouter.post('/sign-in',signInController);

authRouter.post('/sign-out',signOutController);

export default authRouter;