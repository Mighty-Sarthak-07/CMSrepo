import express from "express";
import User from "../models/User.js";
import { authenticateUser } from "../middleware/authMiddleware.js"; // ✅ FIXED IMPORT

const router = express.Router();

// ✅ Protected Route - Get User Profile
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    // ✅ Ensure `req.user.id` exists
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User not found in request" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
