import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCamera, FaGlassCheers } from "react-icons/fa";

const carouselData = [
  {
    id: 1,
    title: "Our Mission",
    desc: "Empowering students to report and resolve campus issues efficiently by providing a seamless and transparent complaint management system.",
    icon: <FaCamera size={32} color="#fff" />, 
    bgColor: "#E74C3C", 
  },
  {
    id: 2,
    title: "Who Can Use This Portal",
    desc: "All enrolled students can file complaints related to campus facilities, including WiFi, electricity, maintenance, and equipment issues.",
    icon: <FaGlassCheers size={32} color="#fff" />,
    bgColor: "#8E44AD", 
  },
  {
    id: 3,
    title: "Types of Complaints We Address",
    desc: "Electrical faults and power outages, Faulty or damaged equipment, Maintenance problems (hostels, classrooms, etc.)",
    icon: <FaCamera size={32} color="#fff" />,
    bgColor: "#3498DB", 
  }
];

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setActiveSlide((prev) => (prev + 1) % carouselData.length);
  const prev = () => setActiveSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);

  const getStyles = (index) => {
    return {
      position: "absolute",
      transition: "transform 0.5s ease, opacity 0.5s ease",
      opacity: activeSlide === index ? 1 : 0.8,
      transform: `translateX(${(index - activeSlide) * 100}%) scale(${activeSlide === index ? 1 : 0.9})`,
      zIndex: activeSlide === index ? 10 : 9,
    };
  };

  return (
    <div className="relative flex justify-center items-center w-full h-[500px] bg-black overflow-hidden p-4 md:p-8">
      <div className="relative h-full flex justify-center items-center w-full">
        {carouselData.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute w-[90%] md:w-[500px] h-[350px] p-6 rounded-xl flex flex-col justify-center items-center shadow-lg"
            style={{ backgroundColor: item.bgColor, ...getStyles(index) }}
          >
            <div className="text-white text-4xl">{item.icon}</div>
            <h2 className="text-white text-xl font-bold mt-2">{item.title}</h2>
            <p className="text-white text-center mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <button
        className="absolute left-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        onClick={prev}
      >
        <FaChevronLeft size={24} color="#333" />
      </button>
      <button
        className="absolute right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        onClick={next}
      >
        <FaChevronRight size={24} color="#333" />
      </button>
    </div>
  );
};

export default Carousel;
