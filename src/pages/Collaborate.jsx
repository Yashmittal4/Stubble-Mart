import React from 'react';
import { motion } from 'framer-motion';
import CollaboratorForm from "../components/collaborate/CollaboratorForm";
import c1 from "../assets/images/collaborator-hero-img.png"

export default function Collaborate() {
    return (
        <div className="font-raleway">
            <div className="w-full relative">
                <div className="absolute top-0 w-full h-[700px] overflow-hidden">
                    <img src={c1} alt="Collaboration Hero" className="w-full h-full object-cover" />
                </div>
                <div className="w-full absolute z-[1] min-h-[700px] bg-black opacity-80">
                </div>
                <div className="relative z-[5] pt-32 pb-16">
                    <motion.h1 
                        className="text-4xl md:text-5xl text-white font-extrabold text-center mb-8 tracking-tight"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-green-600">Collaborate</span> with Us
                    </motion.h1>
                    <motion.p 
                        className="text-center text-white mb-8 text-lg md:text-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Collaborate with us and be part of a growing network of businesses. Together, we can achieve more and create sustainable solutions for the agriculture industry.
                    </motion.p>
                </div>
            </div>
            <div className="relative z-[2] -mt-16 md:-mt-22 pb-20">
                <CollaboratorForm />
            </div>
        </div>
    )
}