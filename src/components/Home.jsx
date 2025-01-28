import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import {Link} from 'react-router-dom';
import { Menu, Heart, Share2, ChevronLeft, ChevronRight, Search, Mic, ArrowRight, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import a1 from "../assets/images/hero.png"
import a2 from "../assets/images/happy.png"
import a3 from "../assets/images/collaboration.png"
import a4 from "../assets/images/image.png"
import a5 from "../assets/images/truck.png"
import a6 from "../assets/images/truck-land.png"
import a7 from "../assets/images/crops.png"
import a8 from "../assets/images/sq-truck.png"
import a9 from "../assets/images/sq-truck-2x.png"
import axios from "axios";
const Home = () => {
  const [stubbleProducts, setStubbleProducts] = useState([]);
  const [loadingStubble, setLoadingStubble] = useState(true);
  const [errorStubble, setErrorStubble] = useState(null);
  const [currentStubbleSlide, setCurrentStubbleSlide] = useState(0);
  const [currentBlogSlide, setCurrentBlogSlide] = useState(0);

  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const stats = [
    { number: 20, suffix: '+', text: 'Years of Excellence' },
    { number: 4000, suffix: '+', text: 'Happy Customers' },
    { number: 12, suffix: '+', text: 'Stubble Machines' },
    { number: 5, suffix: '+', text: 'Years Experience' }
  ];

  useEffect(() => {
    const fetchStubbleProducts = async () => {
      try {
        setLoadingStubble(true);
        const response = await axios.get("http://localhost:5000/api/products");
        setStubbleProducts(response.data.slice(0, 4));
        setLoadingStubble(false);
      } catch (err) {
        setErrorStubble("Error fetching stubble products. Please try again later.");
        setLoadingStubble(false);
      }
    };
  
    fetchStubbleProducts();
  }, []);
  const services = [
    {
      title: 'Recycling Stubble Solutions',
      description: 'Sustainable waste management for a cleaner environment',
      image: a5
    },
    {
      title: 'Modern Agriculture',
      description: 'Advanced farming techniques for increased productivity',
      image: a6
    },
    {
      title: 'Eco-friendly Practices',
      description: 'Promoting environmental conservation in agriculture',
      image: a7
    }
  ];

  const timeline = [
    { year: 2020, event: 'Started operations', progress: 25 },
    { year: 2021, event: 'Expanded to 5 states', progress: 50 },
    { year: 2022, event: 'Launched new products', progress: 75 },
    { year: 2023, event: 'International expansion', progress: 90 },
    { year: 2024, event: 'Sustainability award', progress: 100 }
  ];

  const blogs = [
    {
      title: 'Modern Farming Techniques',
      excerpt: 'Discover the latest in agricultural innovation',
      image: '/placeholder.svg?height=300&width=400',
      date: 'Jan 19, 2024'
    },
    {
      title: 'Sustainable Agriculture',
      excerpt: 'Leading the way in eco-friendly farming',
      image: '/placeholder.svg?height=300&width=400',
      date: 'Jan 18, 2024'
    },
    {
      title: 'Future of Farming',
      excerpt: 'Technology meets traditional agriculture',
      image: '/placeholder.svg?height=300&width=400',
      date: 'Jan 17, 2024'
    }
  ];

  return (
    <div className="relative min-h-screen">
      

      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${a1})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transforming <span className="text-green-400">Stubble</span> into
              <br />
              Sustainable Solutions
            </h1>
            <p className="text-lg mb-8">Join us in our mission to create a greener future</p>
            <Link to="/services">
            <button className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors">
              Learn More
            </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-green-600">Our Impact</h2>
              <p className="text-gray-600 mb-8">We're making a difference in agriculture and sustainability</p>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                      {statsInView && (
                        <CountUp
                          end={stat.number}
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      )}
                    </div>
                    <p className="text-gray-600">{stat.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <img src={a2} alt="Our Impact" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-green-600">Join Our Collaborative Business</h2>
              <p className="text-gray-600 mb-6">
                Empowering Sustainable Partnerships. We work with farmers and businesses
                to create sustainable solutions for agricultural waste management.
              </p>
              <Link to="/collab">
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
                Partner With Us
              </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src={a3} 
                alt="Partnership" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src={a4} 
                alt="Collaboration" 
                className="rounded-lg shadow-lg mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Stubble Section */}
      {/* Popular Stubble Section */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-green-600">Popular Stubble Products</h2>
    {loadingStubble ? (
      <div>Loading stubble products...</div>
    ) : errorStubble ? (
      <div>{errorStubble}</div>
    ) : (
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-all duration-500"
            style={{ transform: `translateX(-${currentStubbleSlide * 100}%)` }}
          >
            {stubbleProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className="min-w-full md:min-w-[33.333%] p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={`http://localhost:5000/${product.image}` || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                    <p className="text-green-600 font-bold">${product.minPrice} - ${product.maxPrice}</p>
                    <Link to={`/products/${product._id}`}>
                      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
                        Sell Stubble
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <button
          onClick={() => setCurrentStubbleSlide(Math.max(0, currentStubbleSlide - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentStubbleSlide(Math.min(stubbleProducts.length - 3, currentStubbleSlide + 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    )}
  </div>
</section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-green-600">Our Services</h2>
            <p className="text-gray-600">Comprehensive solutions for modern agriculture</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{service.title}</h3>
                  <p className="text-gray-200">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Empowering Farmers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-green-600">Empowering FARMERS, Protecting the Environment</h2>
              <p className="text-gray-600 mb-6">
                We're committed to supporting farmers while promoting sustainable practices
                that protect our environment for future generations.
              </p>
              <div ref={timelineRef} className="space-y-4">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <Clock className="h-6 w-6 text-green-500" />
                      <motion.div
                        className="absolute left-3 top-6 w-0.5 bg-green-500"
                        initial={{ height: 0 }}
                        animate={{ height: timelineInView ? '100%' : 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold">{item.year}</span>
                      <p className="text-gray-600">{item.event}</p>
                      <motion.div
                        className="w-full bg-gray-200 rounded-full h-2.5 mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: timelineInView ? `${item.progress}%` : 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 "
            >
              <img 
                src={a8} 
                alt="Farming" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src={a9} 
                alt="Environment" 
                className="rounded-lg shadow-lg mt-8 mr-40 z-10 "
              />
              {/* <img 
                src={a3} 
                alt="Sustainability" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src={a3} 
                alt="Innovation" 
                className="rounded-lg shadow-lg mt-8"
              /> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-green-400">Latest News & Insights</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-all duration-500"
                style={{ transform: `translateX(-${currentBlogSlide * 100}%)` }}
              >
                {blogs.map((blog, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full md:min-w-[33.333%] p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <p className="text-green-400 mb-2">{blog.date}</p>
                        <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
                        <p className="text-gray-400 mb-4">{blog.excerpt}</p>
                        <button className="text-green-400 flex items-center gap-2 hover:text-green-300 transition-colors">
                          Read More <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <button
              onClick={() => setCurrentBlogSlide(Math.max(0, currentBlogSlide - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentBlogSlide(Math.min(blogs.length - 3, currentBlogSlide + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;

