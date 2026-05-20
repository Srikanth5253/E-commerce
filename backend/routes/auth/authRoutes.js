import express from "express";

import {
  registerUser,
  loginUser,
  googleLogin,
  updateProfile,
} from "../../controllers/auth/authController.js"

import protect from "../../middleware/authMiddleware.js"


const router = express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/google-login",
  googleLogin
);

router.put(
  "/profile/update",
  protect,
  updateProfile
);

export default router;