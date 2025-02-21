import Complaint from "../models/Complaint.js";

// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description, department } = req.body;
    
    if (!title || !description || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({
      title,
      description,
      department,
      createdBy: req.user.id, // Ensure user is authenticated
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Complaint Submission Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
