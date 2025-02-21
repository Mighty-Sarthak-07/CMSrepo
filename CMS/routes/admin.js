import express from "express";
import multer from "multer";
import path from "path";
import Admin from "../models/Admin.js";
import Complaint from "../models/Complaint.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Configure Multer for Profile Picture Uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// ✅ Fetch Admin Profile
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

// ✅ Update Admin Profile
router.put("/profile", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const { name, designation } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      { name, designation },
      { new: true, runValidators: true }
    );

    res.json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Upload Profile Picture
router.post("/upload-profile", authenticateUser, authorizeAdmin, upload.single("profilePic"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.profilePic = `/uploads/${req.file.filename}`;
    await admin.save();

    res.json({ message: "Profile picture updated", url: admin.profilePic });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Fetch All Complaints (Admin Only)
router.get("/complaints", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("createdBy", "name email");
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Update Complaint Status (Admin Only)
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
