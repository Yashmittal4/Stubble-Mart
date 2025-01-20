import React, { useState, useEffect } from 'react';
import ab1 from "../../assets/svg/Frame 14.svg"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-raleway">
      
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${ab1})`,
          filter: "brightness(50%)"
        }}
      />

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        
        <h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          Welcome to Stubble Mart
        </h1>

        
        <p 
          className="text-xl md:text-2xl mb-8 text-center max-w-2xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
          }}
        >
          Join the green <span className="text-green-400">Revolution</span> by turning agricultural waste into valuable resources for a cleaner, tech-driven future.
        </p>

       
        <button 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
          }}
        >
          Explore Now
        </button>
      </div>

      
      <div 
        className="absolute inset-0 bg-black"
        style={{
          opacity: isVisible ? 0 : 1,
          transition: 'opacity 1s ease-out'
        }}
      />
    </div>
  );
};

export default Hero;