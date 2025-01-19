// import ab2 from "../../assets/svg/trans3.svg"
// import ab9 from "../../assets/images/collaborator-hero-img.png"
// export default function Explain() {
//     return (
//         <div className="w-full font-raleway relative">
//             <div className=" w-full">
//                 <img src={ab9} alt="dlfa" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
//             </div>
//             <div className="flex flex-col justify-between gap-5 items-center py-[120px] w-[80%] mx-auto relative z-10 ">
//                 <h2 className="font-bold text-[35px] text-white text-center sm:text-start">We Our <span className="text-primary-green">Stubble Mart</span></h2>
//                 <p className="text-white text-[20px] font-medium text-center sm:text-start">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore, molestias!</p>
//                 <div className="sm:flex flex-col  sm:flex-row justify-between bg-white p-8 w-[80%] hidden ">
//                     <div className=" relative w-full sm:w-[400px] h-[250px] ">
//                         <img src={ab2} alt="fda" style={{width: '100%', height: '100%', objectFit: 'contain'}} className="sm:object-cover" />
//                     </div>
//                     <div className="w-full sm:w-[50%] flex flex-col items-center gap-5">
//                         <h3 className="font-bold text-[20px] sm:text-start  text-center">Grow Organics At Your Home With Us</h3>
//                         <p className="font-medium text-[16px] text-center line-clamp-4 sm:line-clamp-none">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem ipsa vero ducimus! Hic aut, rem perspiciatis facilis ipsum ab consequatur, molestias architecto ex vel incidunt qui placeat sapiente nesciunt veniam praesentium nam totam, inventore magnam ipsa reiciendis vitae. Minus!</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



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