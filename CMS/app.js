import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import complaintRoutes from "./routes/complaint.js";
import { authenticateUser, authorizeAdmin } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();
app.use(upload.none());  // ✅ Moved this AFTER app is initialized

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateUser, authorizeAdmin, adminRoutes);
app.use("/api/complaints", authenticateUser, complaintRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
