import express from "express";

import {
  connectRepository,
  getRepositories,
} from "../controllers/RepositoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/connect", protect, connectRepository);
router.get("/", protect, getRepositories);

export default router;
