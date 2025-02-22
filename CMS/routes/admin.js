import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Admin from "../models/Admin.js";
import Complaint from "../models/Complaint.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration for profile picture uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });


router.get("/profile", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password"); // Exclude password
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/profile", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const { name, designation } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      { name, designation },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Profile updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/upload-profile",
  authenticateUser,
  authorizeAdmin,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const admin = await Admin.findById(req.user.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      admin.profilePic = `/uploads/${req.file.filename}`;
      await admin.save();

      res.json({ message: "Profile picture updated successfully", url: admin.profilePic });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/complaints", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("createdBy", "name email");

    if (!complaints.length) {
      return res.status(404).json({ message: "No complaints found" });
    }

    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/complaints/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({ message: "Complaint updated successfully", complaint });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
