import React, { useState, useEffect } from "react";
import { FaCog, FaUserEdit, FaUpload } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [edit, setEdit] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/auth"; // Redirect if not logged in
      return;
    }

    const fetchData = async () => {
      try {
        const [complaintsResponse, adminResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/complaints", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/admin/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setComplaints(complaintsResponse.data);
        setAdmin(adminResponse.data);
        setProfilePic(adminResponse.data.profilePic);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unauthorized. Please log in again.");
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/auth";
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // ✅ Handle profile edit toggle
  const handleEdit = () => setEdit(!edit);

  // ✅ Save profile changes
  const handleProfileUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/admin/profile",
        admin,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // ✅ Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // ✅ Upload profile picture
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/upload-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfilePic(response.data.url);
      alert("Profile photo updated successfully!");
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }

    setShowUploadPopup(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Admin Profile Section */}
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center relative">
        <div className="flex gap-4 items-center">
          <img src={profilePic} className="md:size-36 size-24 rounded-full" alt="Profile" />
          <div className="flex flex-col mx-3">
            {edit ? (
              <>
                <input type="text" value={admin.name} onChange={(e) => setAdmin({ ...admin, name: e.target.value })} className="border p-1 rounded" />
                <input type="text" value={admin.designation} onChange={(e) => setAdmin({ ...admin, designation: e.target.value })} className="border p-1 rounded mt-1" />
                <button onClick={handleProfileUpdate} className="mt-2 p-2 bg-blue-500 text-white rounded">Save</button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{admin.name}</h2>
                <p className="text-gray-500">{admin.designation}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 bg-gray-200 rounded" onClick={handleEdit}><FaUserEdit className="text-2xl mx-2" /></button>
          <button className="p-2 bg-black text-white rounded relative" onClick={() => setSettingsOpen(!settingsOpen)}>
            <FaCog className="text-2xl mx-2" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 mt-12 bg-white shadow-lg p-3 rounded-lg">
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-200" onClick={() => setShowUploadPopup(true)}>
                Change Profile Photo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Picture Upload Popup */}
      {showUploadPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Upload Profile Picture</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
            {selectedFile && <p className="text-sm text-gray-600">{selectedFile.name}</p>}
            <div className="flex justify-center gap-4 mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleUpload}><FaUpload className="inline mr-2" />Upload</button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => setShowUploadPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Complaints Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-bold mb-4">Complaints</h2>
        {complaints.length > 0 ? (
          <ul>
            {complaints.map((c) => (
              <li key={c.id} className="p-3 bg-gray-100 rounded-lg mb-2 shadow">
                <strong>{c.title}</strong>: {c.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No complaints available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
