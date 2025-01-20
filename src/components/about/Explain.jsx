


import React from 'react';
import ab2 from "../../assets/svg/trans3.svg"
import ab9 from "../../assets/images/collaborator-hero-img.png"




export default function Explain() {
    return (
        <section className="bg-gray-50 py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        We Are <span className="text-green-600">Stubble Mart</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Revolutionizing agriculture through sustainable waste management
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="bg-white p-8 rounded-lg shadow-xl z-10 relative">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Transforming Waste into Value
                            </h3>
                            <p className="text-gray-600 mb-6">
                                At Stubble Mart, we're pioneering innovative solutions to convert agricultural 
                                waste into valuable resources. Our process not only helps farmers but also 
                                contributes to a cleaner, more sustainable environment.
                            </p>
                            <a 
                                href="#learn-more" 
                                className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-200 rounded-full opacity-50 filter blur-3xl"></div>
                    </div>

                    <div className="relative">
                        <img 
                            src={ab2} 
                            alt="Stubble field" 
                            className="rounded-lg shadow-xl object-cover w-full h-96"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-transparent opacity-30 rounded-lg"></div>
                    </div>
                </div>

                <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 md:order-1">
                        <img 
                            src={ab9} 
                            alt="Organic products" 
                            className="rounded-lg shadow-xl object-cover w-full h-96"
                        />
                        <div className="absolute inset-0 bg-gradient-to-bl from-green-600 to-transparent opacity-30 rounded-lg"></div>
                    </div>

                    <div className="relative order-1 md:order-2">
                        <div className="bg-white p-8 rounded-lg shadow-xl z-10 relative">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Grow <span className="text-green-600">Organics</span> at Home
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Discover how our products can help you cultivate a thriving organic garden. 
                                We provide eco-friendly solutions that promote healthy plant growth and 
                                soil enrichment, all derived from responsibly managed agricultural waste.
                            </p>
                            <a 
                                href="#our-products" 
                                className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-full border-2 border-green-600 hover:bg-green-600 hover:text-white transition duration-300"
                            >
                                Explore Our Products
                            </a>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-200 rounded-full opacity-50 filter blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}