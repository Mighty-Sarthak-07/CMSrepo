import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    contactNumber: "",
    department: "",
    course: "",
    year: "",
    complaintDetails: "",
    file: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Prepare FormData for the API
    const complaintData = new FormData();
    complaintData.append("fullName", formData.fullName);
    complaintData.append("rollNumber", formData.rollNumber);
    complaintData.append("contactNumber", formData.contactNumber);
    complaintData.append("department", formData.department);
    complaintData.append("course", formData.course);
    complaintData.append("year", formData.year);
    complaintData.append("complaintDetails", formData.complaintDetails);
    if (formData.file) {
      complaintData.append("file", formData.file);
    }

    try {
      await axios.post("http://localhost:5000/api/complaints/create", complaintData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setSuccess("Complaint submitted successfully!");
      setFormData({
        fullName: "",
        rollNumber: "",
        contactNumber: "",
        department: "",
        course: "",
        year: "",
        complaintDetails: "",
        file: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-white rounded-lg shadow-xl max-w-4xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a New Complaint</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            required
          />
          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <input
            type="number"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            required
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT Services</option>
            <option value="Electrical">Electrical</option>
            <option value="Hostel">Hostel</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            required
          />
        </div>
        <textarea
          name="complaintDetails"
          placeholder="Complaint Details"
          value={formData.complaintDetails}
          onChange={handleChange}
          className="p-4 border rounded-lg w-full mt-4 h-32 resize-none"
          required
        ></textarea>
        <div className="mt-4">
          <label className="block text-sm font-semibold">Upload Supporting Documents (Optional)</label>
          <input type="file" onChange={handleFileChange} className="mt-2 w-full p-2 border rounded-lg" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="mt-6 w-full px-6 py-3 bg-black text-white rounded-lg text-lg font-semibold transition-all"
        >
          Submit Complaint
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SubmitComplaint;
