import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token_${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = async (res, accessToken, refreshToken) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const newUser = await User.create({ name, email, password });

    // token && cookies
    const { accessToken, refreshToken } = generateTokens(newUser._id);
    await storeRefreshToken(newUser._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (refresh_token) {
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token_${decoded.userId}`);
    }
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// this will refresh the access token every 20 minutes
export const refreshAccessToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      return res.status(400).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.userId
    const redisStoreToken = await redis.get(`refresh_token_${userId}`)
    if(redisStoreToken !== refresh_token){
      return res.status(401).json({message:'Invalid refresh token'})
    }
    const access_token = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
    res.cookie('access_token',access_token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    return res.status(200).json({message:'Token refreshed successfully'})
  } catch (error) {
    return res.status(500).json({message:"Server error",error:error.message})
  }
};

export const getProfile = async (req,res) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    return res.status(500).json({message:'Server error',error:error.message})
  }
}