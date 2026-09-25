import Repository from "../models/Repository.js";
import { answerRepositoryQuestion } from "../services/ragService.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// Handle a user's chat question about a repository
export const chatWithRepository = async (req, res) => {
  try {
    const { repositoryId, message, chatId } = req.body;

    // STEP 1: Validate request
    if (!repositoryId || !message) {
      return res.status(400).json({
        message: "repositoryId and message are required",
      });
    }

    // STEP 2: Check that the repository belongs
    // to the logged-in user
    const repository = await Repository.findOne({
      _id: repositoryId,
      user: req.userId,
    });

    if (!repository) {
      return res.status(404).json({
        message: "Repository not found",
      });
    }

    // STEP 3: Repository must be indexed
    if (repository.status !== "ready") {
      return res.status(400).json({
        message: "Repository is not ready for chatting yet",
        status: repository.status,
      });
    }

    // STEP 4: Find existing chat OR create a new chat
    let chat;

    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.userId,
        repository: repositoryId,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }
    } else {
      chat = await Chat.create({
        user: req.userId,
        repository: repositoryId,
        title: message.substring(0, 50),
      });
    }

    // STEP 5: Save user's message
    await Message.create({
      chat: chat._id,
      role: "user",
      content: message,
    });

    console.log("STEP 6: Starting RAG...");
    // STEP 6: Run the RAG pipeline
    const result = await answerRepositoryQuestion(message, repositoryId);

    console.log("STEP 6: RAG completed");
    console.log("AI answer received:", result.answer);

    console.log("STEP 7: Saving AI message...");
    // STEP 7: Save AI's response

    await Message.create({
      chat: chat._id,
      role: "assistant",
      content: result.answer,
      sources: result.sources,
    });

    console.log("STEP 7: AI message saved successfully");

    // Update chat's last activity time
    await Chat.findByIdAndUpdate(chat._id, {
      updatedAt: new Date(),
    });

    // STEP 8: Return response
    res.status(200).json({
      chatId: chat._id,
      message,
      answer: result.answer,
      sources: result.sources,
    });
  } catch (error) {
    console.error("Chat controller error:", error.message);

    res.status(500).json({
      message: "Failed to generate answer",
      error: error.message,
    });
  }
};

// Get all messages from a specific chat
export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Find the chat and make sure it belongs
    // to the logged-in user
    const chat = await Chat.findOne({
      _id: chatId,
      user: req.userId,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    // Get all messages belonging to this chat
    // Oldest message comes first
    const messages = await Message.find({
      chat: chatId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      chat,
      messages,
    });
  } catch (error) {
    console.error("Get chat history error:", error.message);

    res.status(500).json({
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

// Get all chats of the logged-in user
export const getUserChats = async (req, res) => {
  try {
    // Find all chats created by this user
    const chats = await Chat.find({
      user: req.userId,
    })
      .populate("repository", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      chats,
    });
  } catch (error) {
    console.error("Get user chats error:", error.message);

    res.status(500).json({
      message: "Failed to get chats",
      error: error.message,
    });
  }
};
