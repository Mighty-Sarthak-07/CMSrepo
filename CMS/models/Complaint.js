import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  contactNumber: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  complaintDetails: { type: String, required: true },
  filePath: { type: String, default: null }, // Stores file path
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", ComplaintSchema);
export default Complaint;
