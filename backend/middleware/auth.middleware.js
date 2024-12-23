import jwt  from "jsonwebtoken"
import User from '../models/user.model.js'

export const protectRoute = async (req,res,next) => {
  try {
    const access_token = req.cookies.access_token
    if(!access_token){
      return res.status(401).json({message:'Unauthorized - No access token provided'})
    }
    try {
      const decoded = jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET)
      const user = await User.findById(decoded.userId).select("-password");
      if(!user){
        return res.status(401).json({message:'User not found'})
      }
      req.user = user
      next()
    } catch (error) {
      if(error.name === "TokenExpiredErrors"){
        return res.status(401).json({message:'Unauthorized - Access token expired'})
      }
      throw error
    }

  } catch (error) {
    return res.status(401).json({message:'Unauthorized - Invalid access token provided'})
  }
}

export const adminRoute = (req,res,next) => {
  if(req.user && req.user.role === "admin"){
    next()
  }else{
    return res.status(403).json({message:"Access denied - Admin only"})
  }
}