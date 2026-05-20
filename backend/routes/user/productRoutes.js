import express from "express";

import {
  getProducts,
  getSingleProduct,
  addReview,
  getRelatedProducts,
} from "../../controllers/user/productController.js";

import protect from "../../middleware/authMiddleware.js"

const router = express.Router();

router.get(
  "/",
  getProducts
);

router.get(
  "/related/:id",
  getRelatedProducts
);

router.get(
  "/:id",
  getSingleProduct
);

router.post(
  "/:id/review",
  protect,
  addReview
);

export default router;