import React, { useState, useEffect } from "react";

import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.jpg";
import s6 from "../assets/s6.jpg";

const FrontPage = () => {
 
  const sliderImages = [s1, s2, s3, s5, s6];
  const [currentImage, setCurrentImage] = useState(s4);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setCurrentImage(sliderImages[currentIndex]);
      currentIndex = (currentIndex + 1) % sliderImages.length;
    }, 2000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  return (
    <div className="bg-gradient-to-br from-purple-400 via-pink-200 to-blue-300 font-[Inter] min-h-screen">

      <main>
        <div className="relative bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 overflow-hidden">
          <div className="max-w-8xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 relative z-20">
                <div className="sm:text-center lg:text-left lg:w-1/2">
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl font-[Poppins] leading-tight animate-fade-in">
                    <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Your Voice Matters!
                    </span>
                    <span className="block text-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      Quick Resolution Platform
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Submit and track your grievances easily. We're here to help you get your concerns addressed quickly and efficiently.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <button className="rounded-full w-full flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl md:text-lg md:px-10">
                        Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
                <img
                  id="changingImage"
                  className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90 border-[2.5px] border-black rounded-lg"
                  src={currentImage}
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-purple-200 to-pink-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-custom/10 rounded-md p-3">
                      <i className="fas fa-edit text-custom text-xl"></i>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-medium text-gray-900">Submit</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        File a new grievance quickly and easily
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-custom/10 rounded-md p-3">
                      <i className="fas fa-check-circle text-custom text-xl"></i>
                    </div>
                    <div className="ml-5">
                    <Link to = {"/home"}>  <h3 className="text-lg font-medium text-gray-900">Resolved</h3></Link>
                      <p className="mt-2 text-sm text-gray-500">
                        View your resolved grievances
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <button className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105">
            <i className="fas fa-robot text-xl"></i>
          </button>
        </div>
      </main>
     
    </div>
  );
};

export default FrontPage;