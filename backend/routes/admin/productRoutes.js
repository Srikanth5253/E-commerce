import express from "express";

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/productController.js";

import protect from "../../middleware/authMiddleware.js";

import adminOnly from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  protect,
  adminOnly,
  addProduct
);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  updateProduct
);

router.delete(
  "/delete/:id",
  protect,
  adminOnly,
  deleteProduct
);

export default router;