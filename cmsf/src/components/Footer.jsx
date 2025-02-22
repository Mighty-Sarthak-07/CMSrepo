import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/submit-complaint" className="hover:underline">Submit Complaint</Link></li>
            <li><Link to="/track-complaints" className="hover:underline">Track Complaints</Link></li>
          
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <ul className="space-y-2">

            <li><Link to="/contactus" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p className="text-sm">Email: support@studentcms.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <p className="text-center mt-6 text-sm">© 2024 Student Complaint Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
