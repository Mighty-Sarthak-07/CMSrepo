import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const faqsData = [
  {
    question: "How do I file a complaint?",
    answer: "You can file a complaint by logging in, selecting the complaint category, describing the issue, and uploading relevant images if needed."
  },
  {
    question: "What types of complaints can I submit?",
    answer: "You can report issues related to WiFi connectivity, electrical failures, equipment malfunctions, and general maintenance."
  },
  {
    question: "How can I track the status of my complaint?",
    answer: "After submitting a complaint, you can visit the Complaint Status page to monitor the progress and resolution updates."
  },
  {
    question: "Can I access the website on mobile?",
    answer: "Absolutely! Our website is fully responsive and works seamlessly on mobile devices."
  },
  {
    question: "Do I need an account to use the services?",
    answer: "Yes, creating an account allows you to access features and track your activity."
  },
  {
    question: "How long does it take to resolve a complaint?",
    answer: "Resolution times vary depending on the complexity of the issue, but you will receive regular updates through the portal."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">FAQs</h1>

      <div className="max-w-4xl w-full space-y-6">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800"
            >
              {faq.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-600 overflow-hidden"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default FAQs;