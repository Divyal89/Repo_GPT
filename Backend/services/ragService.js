import { generateEmbedding } from "./aiService.js";
import { searchSimilarChunks } from "./vectorService.js";
import { generateAnswer } from "./llmService.js";

// Main RAG pipeline
export const answerRepositoryQuestion = async (question, repositoryId) => {
  // --------------------------------------------------
  // STEP 1: Convert the user's question into an embedding
  // --------------------------------------------------
  const embeddingResult = await generateEmbedding(question);

  const questionEmbedding = embeddingResult.embedding;

  console.log("Question embedding dimensions:", questionEmbedding.length);

  // --------------------------------------------------
  // STEP 2: Search Qdrant for relevant code chunks
  // --------------------------------------------------
  const chunks = await searchSimilarChunks(questionEmbedding, repositoryId, 5);

  console.log("Retrieved chunks:", chunks.length);

  // --------------------------------------------------
  // STEP 3: Combine retrieved chunks into context
  // --------------------------------------------------
  const context = chunks
    .map((chunk, index) => {
      return `
--- Code Chunk ${index + 1} ---
File: ${chunk.payload.path}

${chunk.payload.content}
`;
    })
    .join("\n");

  // --------------------------------------------------
  // STEP 4: Create the RAG prompt
  // --------------------------------------------------
  const prompt = `
You are RepoGPT, an AI coding assistant.

Answer the user's question using the repository
code provided below.

Rules:
- Use the provided code as the main source of truth.
- If the answer cannot be found in the provided code,
  clearly say that.
- Do not invent code or repository details.
- Explain the answer clearly and simply.

Repository Code:
${context}

User Question:
${question}
`;

  // --------------------------------------------------
  // STEP 5: Send question + retrieved context to the LLM
  // --------------------------------------------------
  const answer = await generateAnswer(prompt);

  return {
    answer,
    sources: chunks.map((chunk) => ({
      path: chunk.payload.path,
      score: chunk.score,
    })),
  };
};
