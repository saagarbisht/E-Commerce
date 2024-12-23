import { Router } from "express";
import {protectRoute} from '../middleware/auth.middleware.js'
import { checkoutSuccess, createChekoutSession } from "../controllers/payment.controller.js";
const router = Router()

router.post('/create-checkout-session',protectRoute,createChekoutSession)
router.post('/checkout-success',protectRoute,checkoutSuccess)

export default router;