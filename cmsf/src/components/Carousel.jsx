import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCamera, FaGlassCheers } from "react-icons/fa";

const carouselData = [
  {
    id: 1,
    title: "About Us",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: <FaCamera size={32} color="#fff" />, 
    bgColor: "#E74C3C", 
  },
  {
    id: 2,
    title: "About Us",
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    icon: <FaGlassCheers size={32} color="#fff" />,
    bgColor: "#8E44AD", 
  },
  {
    id: 3,
    title: "About Us",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: <FaCamera size={32} color="#fff" />,
    bgColor: "#3498DB", 
  }
];

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const next = () => {
    if (activeSlide < carouselData.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const getStyles = (index) => {
    return {
      position: "absolute",
      transition: "transform 0.5s ease, opacity 0.5s ease",
      opacity: activeSlide === index ? 1 : 0.8,
      transform: `translateX(${(index - activeSlide) * 240}px) scale(${activeSlide === index ? 1 : 0.9})`,
      zIndex: activeSlide === index ? 10 : 9,
    };
  };

  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-black">
      <div className="relative h-64 flex justify-center items-center">
        {carouselData.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute w-[450px] h-[300px] p-6 rounded-xl flex flex-col justify-center items-center shadow-lg"
            style={{ backgroundColor: item.bgColor, ...getStyles(index) }}
          >
            <div className="text-white text-4xl">{item.icon}</div>
            <h2 className="text-white text-xl font-bold mt-2">{item.title}</h2>
            <p className="text-white text-center mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <button
        className="absolute left-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        onClick={prev}
      >
        <FaChevronLeft size={24} color="#333" />
      </button>
      <button
        className="absolute right-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        onClick={next}
      >
        <FaChevronRight size={24} color="#333" />
      </button>
    </div>
  );
};

export default Carousel;
