import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  contactNumber: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  complaintDetails: { type: String, required: true },
  file: { type: String }, // Stores file path
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to User model
}, { timestamps: true });

export default mongoose.model("Complaint", ComplaintSchema);
