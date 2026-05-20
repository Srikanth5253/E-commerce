import express from "express";

import protect from "../../middleware/authMiddleware.js";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../../controllers/user/cartController.js";

const router =
  express.Router();


router.post(
  "/add",
  protect,
  addToCart
);

router.get(
  "/",
  protect,
  getCart
);

router.put(
  "/update-quantity",
  protect,
  updateCartQuantity
);

router.delete(
  "/remove/:productId",
  protect,
  removeFromCart
);

export default router;