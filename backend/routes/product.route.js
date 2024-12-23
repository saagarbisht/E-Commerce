import { Router } from "express";
import { getAllProducts,getFeaturedProducts,createProduct,deleteProduct,getRecommendeddProducts,getProductsByCategory,toggleFeaturedProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = Router()

router.get('/',protectRoute,adminRoute,getAllProducts)
router.delete('/:id',protectRoute,adminRoute,deleteProduct)
router.patch('/:id',protectRoute,adminRoute,toggleFeaturedProducts)
router.post('/',protectRoute,adminRoute,createProduct)
router.get('/featured',getFeaturedProducts)
router.get('/category/:category',getProductsByCategory)
router.get('/recommendations',getRecommendeddProducts)

export default router