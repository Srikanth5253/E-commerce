import express
  from "express";

const router =
  express.Router();

import protect
  from "../../middleware/authMiddleware.js";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
  createCheckoutSession,
  paymentSuccess
} from "../../controllers/user/orderController.js";


router.post(
  "/place",
  protect,
  placeOrder
);

router.post(
  "/checkout",
  protect,
  createCheckoutSession
);


router.post(
  "/payment-success",
  protect,
  paymentSuccess
);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/:id",
  protect,
  getOrderById
);


export default router;