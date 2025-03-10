import express from "express";
import multer from "multer";
import fs from "fs";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create a complaint
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Received File:", req.file);

    const { fullName, rollNumber, contactNumber, department, course, year, complaintDetails } = req.body;
    if (!fullName || !rollNumber || !contactNumber || !department || !course || !year || !complaintDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const complaint = new Complaint({
      fullName,
      rollNumber,
      contactNumber,
      department,
      course,
      year,
      complaintDetails,
      filePath: req.file ? req.file.path : null,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!", complaint });
  } catch (error) {
    console.error("Error:", error.message, error.stack);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
