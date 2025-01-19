import React from 'react';
import s1 from "../../assets/svg/servicebanner2.svg"


import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="w-full">
            <div className="w-full absolute z-[-1] h-[600px]">
                <img src={s1} alt="Services Banner" className="w-full h-full object-cover" />
            </div>
            <div className="w-full z-[1]">
                <div className="w-[80%] mx-auto h-[600px] flex flex-col justify-center">
                    <motion.h1 
                        className="font-bold text-4xl md:text-5xl lg:text-[50px] text-white mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our <span className="text-green-600">Services</span>
                    </motion.h1>
                    <nav aria-label="breadcrumb">
                        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5">
                            <li className="inline-flex items-center gap-1.5">
                                <a href="/" className="text-green-600 font-semibold text-lg md:text-xl lg:text-[24px] transition-colors hover:text-white">Home</a>
                            </li>
                            <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </li>
                            <li className="inline-flex items-center gap-1.5">
                                <a href="/services" className="text-white font-semibold text-lg md:text-xl lg:text-[24px] transition-colors hover:text-green-500">Services</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    )
}