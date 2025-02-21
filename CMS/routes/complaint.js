import express from "express";
import multer from "multer";
import Complaint from "../models/Complaint.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage });

// 🟢 POST: Create a New Complaint
router.post("/create", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Received File:", req.file); // Check uploaded file

    const { fullName, rollNumber, contactNumber, department, course, year, complaintDetails } = req.body;

    // Validate required fields
    if (!fullName || !rollNumber || !contactNumber || !department || !course || !year || !complaintDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create complaint object
    const complaint = new Complaint({
      title: `Complaint from ${fullName}`,
      description: complaintDetails,
      department,
      createdBy: req.user.id,
      filePath: req.file ? req.file.path : null, // Store file path if uploaded
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!", complaint });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
});

// 🟢 GET: Fetch complaints of the logged-in user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 GET: Fetch all complaints (Admin only)
router.get("/all", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const complaints = await Complaint.find().populate("createdBy", "fullName email");
    res.json(complaints);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 PUT: Update Complaint Status (Admin only)
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
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 DELETE: Remove Complaint (User or Admin)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Only allow admin or complaint owner to delete
    if (complaint.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this complaint" });
    }

    await complaint.deleteOne();
    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
