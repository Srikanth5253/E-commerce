import express from "express";

import {
  getAdminConversations,
  getAdminMessages,
  adminSendMessage,
} from "../../controllers/admin/chatController.js";

import protect from "../../middleware/authMiddleware.js";

import admin from "../../middleware/roleMiddleware.js";

const router = express.Router();


router.get(
  "/conversations",
  protect,
  admin,
  getAdminConversations
);


router.get(
  "/messages/:id",
  protect,
  admin,
  getAdminMessages
);

router.post(
  "/message",
  protect,
  admin,
  adminSendMessage
);

export default router;