import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  chatWithRepository,
  getChatHistory,
  getUserChats,
} from "../controllers/chatController.js";

const router = express.Router();

// Chat with a specific repository
router.post("/", protect, chatWithRepository);

// Get messages from an existing chat
router.get("/:chatId", protect, getChatHistory);

// Get all chats of logged-in user
router.get("/", protect, getUserChats);

export default router;
