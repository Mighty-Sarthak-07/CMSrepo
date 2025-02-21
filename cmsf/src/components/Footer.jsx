import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Footer = () => {
  return (

      <footer className="bg-gray-800 text-white p-6 mt-10">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <ul>
              <li><Link to="/submit-complaint" className="hover:underline">Submit Complaint</Link></li>
              <li><Link to="/track-complaints" className="hover:underline">Track Complaints</Link></li>
              <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Support</h3>
            <ul>
              <li><Link to="/help-center" className="hover:underline">Help Center</Link></li>
              <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Contact</h3>
            <p>Email: support@studentcms.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <p className="text-center mt-4">© 2024 Student Complaint Management System. All rights reserved.</p>
      </footer>
  );
};

export default Footer;
