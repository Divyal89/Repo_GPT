import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema(
  {
    // Repository belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Repository name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Full repository name e.g. "divyal/RepoGPT"
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    // GitHub repository URL
    githubUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Repository description
    description: {
      type: String,
      default: "",
    },

    // Main programming language
    language: {
      type: String,
      default: "Unknown",
    },

    // Number of GitHub stars
    stars: {
      type: Number,
      default: 0,
    },

    // Number of files indexed by RepoGPT
    files: {
      type: Number,
      default: 0,
    },

    // Repository processing status
    status: {
      type: String,
      enum: ["connected", "indexing", "ready", "error"],
      default: "connected",
    },
  },
  {
    timestamps: true,
  },
);

const Repository = mongoose.model("Repository", RepoSchema);

export default Repository;
