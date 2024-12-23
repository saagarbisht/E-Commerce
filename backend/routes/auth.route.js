import {Router} from 'express'

import { signup,login,logout,refreshAccessToken, getProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/refresh-access-token',refreshAccessToken) 
router.get('/profile',protectRoute,getProfile) 

export default router
