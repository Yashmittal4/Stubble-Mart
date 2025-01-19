import React from 'react';
import { service } from '../utils';
import ServiceCard from './ServiceCard';
import s2 from "../../assets/svg/green.svg"

import { motion } from 'framer-motion';


export default function OurServices() {
    return (
        <div className="w-full py-16 bg-gray-50">
            <div className="w-[90%] mx-auto flex flex-col items-center gap-6">
                <motion.img 
                    src={s2} 
                    alt="Services Icon" 
                    width={100} 
                    height={100}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <motion.h2 
                    className='text-2xl md:text-3xl font-normal text-gray-600'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Our <span className="text-green-600">Services</span>
                </motion.h2>
                <motion.h3 
                    className='font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    What We <span className="text-green-600">Offer</span>
                </motion.h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                    {service.map((el, index) => (
                        <ServiceCard key={el.id} el={el} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}