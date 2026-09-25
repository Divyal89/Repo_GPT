import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    // The user who owns this chat
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The repository this chat belongs to
    repository: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
      required: true,
    },

    // Optional title for displaying the chat in the UI
    title: {
      type: String,
      default: "New Chat",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Chat", ChatSchema);

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
