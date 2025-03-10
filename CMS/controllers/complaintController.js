import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint({ ...req.body, createdBy: req.user.id });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

