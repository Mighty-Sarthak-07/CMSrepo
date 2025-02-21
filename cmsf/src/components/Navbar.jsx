import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <nav className="bg-white shadow flex justify-between items-center p-4 relative">
      <h1 className="text-xl font-bold text-blue-600">Student CMS</h1>

      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
          <FaBell size={24} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
        {isNotificationOpen && (
          <div className="absolute top-12 right-4 bg-white shadow-lg rounded-md w-64 p-4 z-50">
            <h3 className="font-bold mb-2">Notifications</h3>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} className="p-2 border-b hover:bg-gray-100">{notification}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No new complaints</p>
            )}
          </div>
        )}

        <div className="relative cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaUserCircle size={28} />
        </div>
      </div>

      {isSidebarOpen && (
        <div className="absolute top-12 right-4 bg-white shadow-lg rounded-md w-64 p-4 z-50">
          {user ? (
            <>
              <p className="p-2 text-gray-700">Welcome, {user.name}</p>
              <Link to="/admindashboard" className="flex p-2 hover:bg-gray-200 "><CgProfile className="mt-1 mx-2 text-xl" />Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left p-2 hover:bg-gray-200 flex"><IoMdLogOut className="mt-1 mx-2 text-xl" />Logout</button>
            </>
          ) : (
            <Link to="/auth" className="flex p-2 hover:bg-gray-200 "><IoMdLogIn className="mt-1 mx-2 text-xl" />Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
