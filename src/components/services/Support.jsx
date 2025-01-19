import React from 'react';
import { support } from "../utils";
import SupportCard from "./SupportCard";


import { motion } from 'framer-motion';


export default function Support() {
    return (
        <div className="w-full bg-gray-50 py-16">
            <div className="w-[90%] md:w-[80%] lg:w-[75%] mx-auto">
                <motion.h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    How We <span className="text-green-600">Support</span> You
                </motion.h2>
                <div className="space-y-16 md:space-y-24">
                    {support.map((el, index) => (
                        <SupportCard key={el.id} el={el} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}