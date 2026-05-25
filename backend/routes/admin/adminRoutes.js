import express
from "express";

const router =
  express.Router();

import protect from "../../middleware/authMiddleware.js";

import admin from "../../middleware/roleMiddleware.js";

import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  processRefund,
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

router.put(
  "/orders/refund/:id",
  protect,
  admin,
  processRefund
);

export default router;