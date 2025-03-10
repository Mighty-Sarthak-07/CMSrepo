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

  const validateInput = () => {
    if (!isLogin && !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(formData.name)) {
      setError("Username must start with an alphabet and contain only alphanumeric characters.");
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/.test(formData.password)) {
      setError("Password must be alphanumeric and at least 4 characters long.");
      return false;
    }
    return true;
  };

  const toggleForm = () => {
    setError("");
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", role: "student" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setError("");

    try {
      const url = `${baseURL}/${isLogin ? "login" : "signup"}`;
      const requestData = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

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

  return (  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-5">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      className="relative w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl"
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-center mb-6 text-gray-800"
      >
        {isLogin ? "Login" : "Sign Up"}
      </motion.h2>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <motion.input 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            type="text" 
            name="name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required 
          />
        )}
        <motion.input 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required 
        />
        <motion.input 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required 
        />
        {!isLogin && (
          <motion.select 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </motion.select>
        )}
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </motion.button>
      </form>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-6 text-gray-700 font-medium"
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span 
          className="text-indigo-600 cursor-pointer ml-1 font-semibold hover:underline"
          onClick={toggleForm}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </motion.p>
    </motion.div>
  </div>
 );
};

export default Auth;
