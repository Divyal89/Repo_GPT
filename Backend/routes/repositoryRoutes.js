import express from "express";

import {
  connectRepository,
  getRepositories,
} from "../controllers/RepositoryController.js";
import { protect } from "../middleware/authMiddleware.js";

import { searchSimilarChunks } from "../services/vectorService.js";
import { generateEmbedding } from "../services/aiService.js";

const router = express.Router();

router.post("/connect", protect, connectRepository);
router.get("/", protect, getRepositories);

// Temporary route to test Qdrant similarity search
router.post("/search", protect, async (req, res) => {
  try {
    const { question, repositoryId } = req.body;

    if (!question || !repositoryId) {
      return res.status(400).json({
        message: "Question and repositoryId are required",
      });
    }

    // Convert the user's question into the same
    // 384-dimensional vector space used for code embeddings.
    const embeddingResult = await generateEmbedding(question);

    console.log(
      "Question embedding dimensions:",
      embeddingResult.embedding?.length,
    );

    console.log(
      "Question embedding is array:",
      Array.isArray(embeddingResult.embedding),
    );

    // Search Qdrant for the most similar code chunks.
    const results = await searchSimilarChunks(
      embeddingResult.embedding,
      repositoryId,
      5,
    );

    res.status(200).json({
      question,
      results,
    });
  } catch (error) {
    console.error("Similarity search failed:");
    console.error("Message:", error.message);
    console.error("Response:", error.response?.data);

    throw error;

    res.status(500).json({
      message: "Similarity search failed",
      error: error.message,
    });
  }
});

export default router;
