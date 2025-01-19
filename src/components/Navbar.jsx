import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Menu, Heart, Share2, ChevronLeft, ChevronRight, Search, Mic, ArrowRight, Clock } from 'lucide-react';
import logo from "../assets/svg/logo.svg"
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
    <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
        style={{ scaleX }}
      />

      
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-40 px-4 py-1">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-[10vh]" />
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-md mx-6">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full"
            />
            <Mic className="h-5 w-5 text-gray-400 ml-2 cursor-pointer" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 text-[1.20rem] hover:text-green-500">Home</Link>
            <Link to="/about" className="text-gray-700 text-[1.20rem] hover:text-green-500">About</Link>
            <Link to="/services" className="text-gray-700 text-[1.20rem] hover:text-green-500">Services</Link>
            <Link to="/collab" className="text-gray-700 text-[1.20rem] hover:text-green-500">Collab</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col p-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full"
                />
                <Mic className="h-5 w-5 text-gray-400 ml-2" />
              </div>
              <Link to="/" className="py-2 text-gray-700 hover:text-green-500">Home</Link>
              <Link to="/about" className="py-2 text-gray-700 hover:text-green-500">About</Link>
              <Link to="/services" className="py-2 text-gray-700 hover:text-green-500">Services</Link>
              <a href="/collab" className="py-2 text-gray-700 hover:text-green-500">Collab</a>
            </div>
          </motion.div>
        )}
      </nav>
      
    </>
  )
}

export default Navbar
