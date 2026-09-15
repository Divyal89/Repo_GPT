import express from "express";
import { RegisterUser, LoginUser } from "../controllers/UserController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router;
