import express from "express";

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/admin/productController.js";

import protect from "../../middleware/authMiddleware.js";

import adminOnly from "../../middleware/roleMiddleware.js";

import upload from "../../middleware/upload.js";

const router = express.Router();

router.post(
  "/add",
  protect,
  adminOnly,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
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