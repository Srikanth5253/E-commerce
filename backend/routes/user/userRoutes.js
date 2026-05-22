import express from "express";

import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../../controllers/user/userController.js";

import {
  protect,
} from "../../middleware/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/address",
  protect,
  getAddresses
);

router.post(
  "/address",
  protect,
  addAddress
);

router.put(
  "/address/:id",
  protect,
  updateAddress
);

router.delete(
  "/address/:id",
  protect,
  deleteAddress
);

export default router;