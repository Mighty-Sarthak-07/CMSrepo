import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");

  const baseURL = "http://localhost:5000/api/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setError("");
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", role: "student" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = `${baseURL}/${isLogin ? "login" : "signup"}`;
      const requestData = isLogin ? { email: formData.email, password: formData.password } : formData;
      const { data } = await axios.post(url, requestData);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");
        window.location.href = data.user.role === "admin" ? "/admindashboard" : "/dashboard";
      } else {
        alert("Signup Successful! Please Login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="relative w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" required />
          <select name="role" onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg bg-white">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-black text-white rounded-lg font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className="text-blue-600 cursor-pointer ml-1" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
