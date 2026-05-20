import express from "express";

import {
  createConversation,
  sendMessage,
  getMessages,
} from "../../controllers/user/chatController.js";

import protect from "../../middleware/authMiddleware.js";

const router = express.Router();


router.post(
  "/conversation",
  protect,
  createConversation
);

router.post(
  "/message",
  protect,
  sendMessage
);

router.get(
  "/messages/:id",
  protect,
  getMessages
);

export default router;