import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import SubmitComplaint from "./components/SubmitComplaint";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Carousel from "./components/Carousel";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const token = localStorage.getItem("token"); // ✅ Check if user is logged in

  return (
    <Router>
      <NavBar />
      
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={
          <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Home />
            <Carousel />
          </main>
        } />
        <Route path="/submit-complaint" element={<SubmitComplaint />} /> 
        <Route path="/auth" element={<Auth />} /> 

        {/* ✅ Protected Route (Only for logged-in users) */}
        <Route 
          path="/admindashboard" 
          element={token ? <AdminDashboard /> : <Navigate to="/login" />} 
        />

        {/* ✅ Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
