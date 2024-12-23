import { Router } from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { geAnalyticsData, getDailySalesData } from "../controllers/analytic.controller.js";

const router = Router()

router.get('/',protectRoute,adminRoute,async (req,res) => {
  try {
    const analyticsData = await geAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    const daillySalesData = await getDailySalesData(startDate,endDate)

    return res.status(200).json(
      {
        analyticsData,
        daillySalesData
      }
    )

  } catch (error) {
    res.status(500).json({message:'Server Error',error:error.message})
  }
})

export default router