import express from "express";
import multer from "multer";
import fs from "fs";
import Complaint from "../models/Complaint.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/create", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    console.log("User Data from Token:", req.user);
    console.log("Received Data:", req.body);
    console.log("Received File:", req.file);

    const { fullName, rollNumber, contactNumber, department, course, year, complaintDetails } = req.body;


    if (!fullName || !rollNumber || !contactNumber || !department || !course || !year || !complaintDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }


    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    const complaint = new Complaint({
      fullName,
      rollNumber,
      contactNumber,
      department,
      course,
      year,
      complaintDetails,
      createdBy: req.user.id, 
      filePath: req.file ? req.file.path : null,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!", complaint });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


router.get("/", authenticateUser, async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/all", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const complaints = await Complaint.find().populate("createdBy", "fullName email");
    res.json(complaints);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id/status", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { status } = req.body;
    if (!["Pending", "In Process", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const complaint = await Complaint.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint status updated successfully", complaint });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this complaint" });
    }

    await complaint.deleteOne();
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
