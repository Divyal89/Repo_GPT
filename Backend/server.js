import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import repositoryRoutes from "./routes/repositoryRoutes.js";

import {
  testQdrantConnection,
  createRepoGPTCollection,
  createRepositoryPayloadIndex,
} from "./services/vectorService.js";

const app = express();

connectDB();
testQdrantConnection();
createRepoGPTCollection();
createRepositoryPayloadIndex();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/repositories", repositoryRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
