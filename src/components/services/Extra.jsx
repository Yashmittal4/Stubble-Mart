import React from 'react';
import s3 from "../../assets/svg/cow.svg"


import { motion } from 'framer-motion';

export default function Extra() {
    return (
        <div className="w-full h-[500px] relative overflow-hidden">
            <div className="w-full absolute inset-0 z-[-1]">
                <img src={s3} alt="Background" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full bg-black bg-opacity-50 absolute inset-0" />
            <div className="w-[80%] mx-auto h-full flex flex-col justify-center items-center relative z-10">
                <motion.h2 
                    className="text-green-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Services We <span className="text-white">Do</span>
                </motion.h2>
                <motion.h3 
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Services We <span className="text-green-600">Provide</span>
                </motion.h3>
            </div>
        </div>
    )
}