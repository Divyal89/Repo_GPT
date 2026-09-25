import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    // Which chat this message belongs to
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    // Who sent the message
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    // Actual message text
    content: {
      type: String,
      required: true,
    },

    // Sources returned by RAG
    sources: [
      {
        path: String,
        score: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Message", MessageSchema);
