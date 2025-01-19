import React from 'react';
import { motion } from 'framer-motion';

export default function SupportCard({ el, index }) {
    return (
        <motion.div 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="w-full md:w-1/2">
                <img src={el.img || "/placeholder.svg"} alt={el.head} className="w-full h-auto rounded-lg shadow-lg" />
                <div className={`bg-green-600 text-white text-xl md:text-2xl font-bold rounded-md py-2 px-4 mt-4 text-center md:text-left ${index % 2 !== 0 && "md:text-right"}`}>
                    {el.head2}
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-green-600 font-bold text-2xl md:text-3xl lg:text-4xl">{el.head}</h3>
                <p className="text-gray-700 text-lg md:text-xl">{el.desc}</p>
            </div>
        </motion.div>
    )
}