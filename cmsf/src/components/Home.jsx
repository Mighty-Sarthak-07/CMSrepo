import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWifi, FaLightbulb, FaTools, FaBolt, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const complaintsData = [
  { id: 1, title: "Wi-Fi Connectivity Issue", department: "IT Department", status: "Pending", time: "2 hours ago", icon: <FaWifi />, administrator: "Admin John Doe", details: "Wi-Fi is down in hostel area." },
  { id: 2, title: "Room Light Not Working", department: "Electrical", status: "In Process", time: "1 day ago", icon: <FaLightbulb />, administrator: "Admin Jane Smith", details: "Light not working in room 302." },
  { id: 3, title: "Hostel Room Maintenance", department: "Hostel", status: "Resolved", time: "2 days ago", icon: <FaTools />, administrator: "Admin Robert Brown", details: "Leaking tap fixed in room 101." },
];

const Home = () => {
  const [complaints, setComplaints] = useState(complaintsData);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="bg-black text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">How to File a Complaint</h1>
        <p className="my-3 mb-6">Follow these simple steps to submit your complaint and track its progress</p>
        <Link to="/submit-complaint" className="mt-4 px-4 py-2 bg-white text-black rounded-md">File a Complaint</Link>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 my-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-yellow-200 p-4 rounded-lg text-center text-md md:text-lg">
          <h2 className="font-bold">Pending</h2>
          <p className="text-2xl">{complaints.filter(c => c.status === "Pending").length}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-blue-200 p-4 rounded-lg text-center">
          <h2 className="font-bold">In Process</h2>
          <p className="text-2xl">{complaints.filter(c => c.status === "In Process").length}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-green-200 p-4 rounded-lg text-center">
          <h2 className="font-bold">Resolved</h2>
          <p className="text-2xl">{complaints.filter(c => c.status === "Resolved").length}</p>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">My Recent Complaints</h2>
        {complaints.map((complaint) => (
          <motion.div key={complaint.id} initial={{ x: -100 }} animate={{ x: 0 }} className="flex items-center justify-between p-4 border-b cursor-pointer" onClick={() => setSelectedComplaint(complaint)}>
            <div className="flex items-center gap-3">
              {complaint.icon}
              <div>
                <h3 className="font-semibold">{complaint.title}</h3>
                <p className="text-gray-500 text-sm"><span className="bg-purple-400 text-black px-2 py-1 my-3 rounded-xl">{complaint.department}</span> • {complaint.time}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm md:text-md text-white ${complaint.status === "Pending" ? "bg-yellow-500" : complaint.status === "In Process" ? "bg-blue-500" : "bg-green-500"}`}>
              {complaint.status}
            </span>
          </motion.div>
        ))}
      </div>

      {selectedComplaint && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">{selectedComplaint.title}</h2>
            <p className="mb-2">{selectedComplaint.details}</p>
            <p className="text-sm text-gray-600">Resolved by: {selectedComplaint.administrator}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSelectedComplaint(null)}>Close</button>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Home;
