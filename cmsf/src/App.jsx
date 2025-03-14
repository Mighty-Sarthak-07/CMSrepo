import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import SubmitComplaint from "./components/SubmitComplaint";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import AdminDashboard from "./components/AdminDashboard";
import Chatbot from "./components/Chatbot"; 
import ErrorBoundary from "./components/ErrorBoundary";
import ContactUs from "./components/Contact";
import FAQs from "./components/FAQs";
import FrontPage from "./components/FrontPage";


function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <NavBar />
      
      <Routes>
        <Route path="/" element={
          <main className="relative min-h-screen min-w-full overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10">
            <Home />
          </main>
        } />
        <Route path="/submit-complaint" element={<SubmitComplaint />} /> 
        <Route path="/auth" element={<Auth />} /> 
        <Route path="/contactus" element={<ContactUs />} /> 
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<FrontPage />} />

        <Route
          path="/chatbot"
          element={
            <ErrorBoundary>
              <Chatbot />
            </ErrorBoundary>
          }
        />

        <Route 
          path="/admindashboard" 
          element={token ? <AdminDashboard /> : <Navigate to="/login" />} 
        />

        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
