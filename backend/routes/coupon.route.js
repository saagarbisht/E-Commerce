import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const router = Router()

router.get('/',protectRoute,getCoupon)
router.post('/validate',protectRoute,validateCoupon)

export default router