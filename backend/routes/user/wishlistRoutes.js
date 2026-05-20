import express from "express";

import protect from "../../middleware/authMiddleware.js";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../controllers/user/wishlistController.js";

const router =
  express.Router();


router.post(
  "/add",
  protect,
  addToWishlist
);

router.get(
  "/",
  protect,
  getWishlist
);


router.delete(
  "/remove/:productId",
  protect,
  removeFromWishlist
);

export default router;