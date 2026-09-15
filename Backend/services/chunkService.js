// ============================================================
// CODE CHUNKING SERVICE
// ============================================================
//
// This service takes repository files and divides their
// content into smaller pieces called "chunks".
//
// FUTURE:
// These chunks will be converted into embeddings and stored
// in a vector database for RAG.
// ============================================================

// ------------------------------------------------------------
// Chunk a single file
// ------------------------------------------------------------

export const chunkFile = (file, chunkSize = 1000, overlap = 200) => {
  const chunks = [];

  const content = file.content;

  // If file has no content, don't create chunks
  if (!content || content.trim().length === 0) {
    return chunks;
  }

  // ----------------------------------------------------------
  // Start position
  // ----------------------------------------------------------

  let start = 0;

  // ----------------------------------------------------------
  // Create chunks until entire file is processed
  // ----------------------------------------------------------

  while (start < content.length) {
    // Calculate end position
    const end = start + chunkSize;

    // Extract part of the file
    const chunkContent = content.slice(start, end);

    // Store chunk information
    chunks.push({
      path: file.path,
      content: chunkContent,
    });

    // --------------------------------------------------------
    // Move forward
    // --------------------------------------------------------
    //
    // Example:
    //
    // chunkSize = 1000
    // overlap = 200
    //
    // First chunk:
    // 0 → 1000
    //
    // Second chunk:
    // 800 → 1800
    //
    // So 200 characters overlap.
    // --------------------------------------------------------

    start += chunkSize - overlap;
  }

  return chunks;
};

// ============================================================
// CHUNK ENTIRE REPOSITORY
// ============================================================

export const chunkRepository = (
  repositoryFiles,
  chunkSize = 1000,
  overlap = 200,
) => {
  const allChunks = [];

  // Process every repository file
  for (const file of repositoryFiles) {
    const fileChunks = chunkFile(file, chunkSize, overlap);

    // Add file chunks to the main array
    allChunks.push(...fileChunks);
  }

  return allChunks;
};
