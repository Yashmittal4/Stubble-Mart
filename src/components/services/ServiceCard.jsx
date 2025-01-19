import React from 'react';
import { motion } from "framer-motion";

export default function ServiceCard({ el, index }) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-green rounded-lg shadow-lg overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div 
                className="absolute inset-0 bg-green-700"
                initial={{ height: 0 }}
                animate={{ height: isHovered ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
            />
            <div className="p-6 relative z-10">
                <div className={`font-bold text-4xl md:text-5xl mb-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-green-600'}`}>
                    {el.tag}
                </div>
                <h3 className={`font-bold text-2xl md:text-3xl mb-2 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-800'}`}>
                    {el.name}
                </h3>
                <p className={`text-lg md:text-xl transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
                    {el.desc}
                </p>
            </div>
        </motion.div>
    )
}