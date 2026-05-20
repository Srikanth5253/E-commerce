import express
from "express";

const router =
  express.Router();

import protect from "../../middleware/authMiddleware.js";

import admin from "../../middleware/roleMiddleware.js";

import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus
} from "../../controllers/admin/adminController.js";


router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);

router.get(
  "/orders",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/orders/:id",
  protect,
  admin,
  updateOrderStatus
);

export default router;