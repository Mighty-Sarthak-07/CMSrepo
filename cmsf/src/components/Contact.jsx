import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ContactUs = () => {
  const navigate = useNavigate();
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    // Form validation
    const formData = new FormData(form.current);
    const userName = formData.get("user_name");
    const userEmail = formData.get("user_email");
    const message = formData.get("message");

    if (!userName || !userEmail || !message) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear previous errors
    setStatusMessage("Sending...");

    emailjs
      .sendForm("service_4yoscee", "template_zexix3s", form.current, {
        publicKey: "RyaCCOkmWaxL696Vz",
      })
      .then(
        () => {
          setStatusMessage("Email has been sent successfully!");
          form.current.reset(); // Clear the form after sending
        },
        (error) => {
          console.error("Email sending failed:", error);
          setStatusMessage("Failed to send the message. Try again later.");
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        {statusMessage && <p className="mt-4 text-green-600 text-center">{statusMessage}</p>}

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-blue-600 hover:underline block text-center"
        >
          Go to Home
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;