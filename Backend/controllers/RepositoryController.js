import Repository from "../models/Repository.js";

import {
  getGithubRepository,
  getAllGithubFiles,
  getGithubFileContent,
} from "../services/githubService.js";

import { chunkRepository } from "../services/chunkService.js";
// ============================================================
// CONNECT GITHUB REPOSITORY
// ============================================================

export const connectRepository = async (req, res) => {
  try {
    // ----------------------------------------------------------
    // 1. Get GitHub URL from frontend
    // ----------------------------------------------------------

    const { githubUrl } = req.body;

    // Check whether URL was provided
    if (!githubUrl) {
      return res.status(400).json({
        message: "GitHub URL is required",
      });
    }

    console.log("GitHub URL:", githubUrl);

    // ----------------------------------------------------------
    // 2. Extract GitHub owner and repository name
    // ----------------------------------------------------------

    const urlParts = githubUrl.split("/");

    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];

    console.log("Owner:", owner);
    console.log("Repository:", repo);

    // ----------------------------------------------------------
    // 3. Get repository information from GitHub
    // ----------------------------------------------------------

    const githubData = await getGithubRepository(owner, repo);

    console.log("GitHub Data:", githubData);

    // ----------------------------------------------------------
    // 4. Get the default branch
    // ----------------------------------------------------------

    const branch = githubData.default_branch;

    console.log("Default Branch:", branch);

    // ----------------------------------------------------------
    // 5. Get all files from the repository
    // ----------------------------------------------------------

    const files = await getAllGithubFiles(owner, repo, branch);

    console.log("Total Files:", files.length);

    // ----------------------------------------------------------
    // 6. Select only files useful for RepoGPT
    // ----------------------------------------------------------

    // We don't want to send images, videos, binaries, etc.
    // to our AI pipeline.
    //
    // FUTURE:
    // We can make this filter more advanced by:
    // - ignoring node_modules
    // - ignoring .git
    // - ignoring build/dist folders
    // - ignoring very large files
    // - detecting programming languages automatically

    const supportedExtensions = [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".py",
      ".java",
      ".cpp",
      ".c",
      ".h",
      ".html",
      ".css",
      ".json",
      ".md",
    ];

    // ----------------------------------------------------------
    // Filter files useful for RepoGPT
    // ----------------------------------------------------------
    //
    // We ignore dependency/build folders because they contain
    // huge amounts of generated or third-party code.
    //
    // FUTURE:
    // Add more folders/extensions here as the project grows.
    // ----------------------------------------------------------

    const ignoredFolders = [
      "node_modules/",
      ".git/",
      "dist/",
      "build/",
      "coverage/",
      ".next/",
      "vendor/",
    ];

    const usefulFiles = files.filter((file) => {
      const filePath = file.path.toLowerCase();

      // Ignore unwanted folders
      const isIgnored = ignoredFolders.some((folder) =>
        filePath.includes(folder),
      );

      if (isIgnored) {
        return false;
      }

      // Keep only supported file types
      return supportedExtensions.some((extension) =>
        filePath.endsWith(extension),
      );
    });

    console.log("Useful files:", usefulFiles.length);

    // Temporary safety limit
    // Read maximum 100 files for now
    const filesToRead = usefulFiles.slice(0, 100);

    console.log("Files selected for reading:", filesToRead.length);

    // ----------------------------------------------------------
    // 7. Read the actual content of each useful file
    // ----------------------------------------------------------

    // This array will temporarily contain:
    //
    // {
    //   path: "src/App.jsx",
    //   content: "actual code..."
    // }
    //
    // FUTURE:
    // We will send this data to the code-processing
    // and chunking pipeline.

    const repositoryFiles = [];

    for (const file of filesToRead) {
      try {
        // Get actual file content from GitHub
        const content = await getGithubFileContent(owner, repo, file.path);

        // Store file path + content
        repositoryFiles.push({
          path: file.path,
          content: content,
        });

        console.log("Read:", file.path);
      } catch (error) {
        // If one file cannot be read,
        // don't stop the entire repository ingestion.
        console.log("Could not read:", file.path, error.message);
      }
    }

    // ----------------------------------------------------------
    // 9. Create chunks from repository files
    // ----------------------------------------------------------
    //
    // repositoryFiles contains complete files.
    //
    // We now divide those files into smaller pieces
    // for the future AI/RAG pipeline.
    //

    const chunks = chunkRepository(repositoryFiles, 1000, 200);

    console.log("Total Chunks:", chunks.length);

    // ----------------------------------------------------------
    // 8. Show ingestion result
    // ----------------------------------------------------------

    console.log("Successfully read files:", repositoryFiles.length);

    // FUTURE:
    // At this stage we will eventually do:
    //
    // repositoryFiles
    //       ↓
    // Code processing
    //       ↓
    // Chunking
    //       ↓
    // Embeddings
    //       ↓
    // Vector Database
    //
    // This is the main RepoGPT AI pipeline.

    // ----------------------------------------------------------
    // 9. Check if repository is already connected
    // ----------------------------------------------------------

    const existingRepository = await Repository.findOne({
      githubUrl: githubData.html_url,
      user: req.userId,
    });

    if (existingRepository) {
      return res.status(400).json({
        message: "Repository already connected",
      });
    }

    // ----------------------------------------------------------
    // 10. Save repository information in MongoDB
    // ----------------------------------------------------------

    const repository = await Repository.create({
      // Logged-in user
      user: req.userId,

      // Repository name
      name: githubData.name,

      // Example:
      // Divyal89/Quick-AI
      fullName: githubData.full_name,

      // GitHub repository URL
      githubUrl: githubData.html_url,

      // Repository description
      description: githubData.description || "",

      // Main programming language
      language: githubData.language || "Unknown",

      // Number of GitHub stars
      stars: githubData.stargazers_count || 0,

      // Number of files successfully read
      files: repositoryFiles.length,

      // Current repository status
      status: "connected",
    });

    // ----------------------------------------------------------
    // 11. Send response back to frontend
    // ----------------------------------------------------------

    res.status(201).json({
      message: "Repository connected successfully",

      repository,
    });
  } catch (error) {
    // ----------------------------------------------------------
    // GitHub / Server Error
    // ----------------------------------------------------------

    console.error("GitHub repository error:");

    console.error("Status:", error.response?.status);

    console.error("Data:", error.response?.data);

    console.error("Message:", error.message);

    res.status(500).json({
      message: "Failed to connect GitHub repository",

      error: error.response?.data || error.message,
    });
  }
};

// ============================================================
// GET ALL CONNECTED REPOSITORIES
// ============================================================

export const getRepositories = async (req, res) => {
  try {
    // ----------------------------------------------------------
    // Get repositories belonging to logged-in user
    // ----------------------------------------------------------

    const repositories = await Repository.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    // ----------------------------------------------------------
    // Send repositories to frontend
    // ----------------------------------------------------------

    res.status(200).json({
      repositories,
    });
  } catch (error) {
    console.error("Get repositories error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
