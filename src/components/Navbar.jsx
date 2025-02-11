import React, { useState, useEffect } from "react"
import { Menu, Search, Mic, LogOut } from 'lucide-react'
import { motion, useScroll, useSpring } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import logo from "../assets/svg/logo.svg"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const { scrollYProgress } = useScroll()
  const location = useLocation()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-green-500 origin-left z-50" style={{ scaleX }} />

      <nav className="fixed top-0 w-full bg-white shadow-md z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-16" />

            {/* <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-md mx-6">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full text-gray-700" />
              <Mic className="h-5 w-5 text-gray-400 ml-2 cursor-pointer" />
            </div> */}

            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
              <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
              <NavLink to="/services" currentPath={location.pathname}>Services</NavLink>
              <NavLink to="/collab" currentPath={location.pathname}>Collab</NavLink>
              <NavLink to="/products" currentPath={location.pathname}>Sell</NavLink>

              {user ? (
                <>
                  <span className="text-gray-700">Hi {user.name}</span>
                  <NavButton onClick={handleLogout}>
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </NavButton>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <NavButton>Login</NavButton>
                  </Link>
                  <Link to="/signup">
                    <NavButton primary>Sign Up</NavButton>
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-500 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4"
            >
              {/* <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-gray-700"
                />
                <Mic className="h-5 w-5 text-gray-400 ml-2" />
              </div> */}
              <div className="flex flex-col space-y-2">
                <NavLink to="/" currentPath={location.pathname} mobile>Home</NavLink>
                <NavLink to="/about" currentPath={location.pathname} mobile>About</NavLink>
                <NavLink to="/services" currentPath={location.pathname} mobile>Services</NavLink>
                <NavLink to="/collab" currentPath={location.pathname} mobile>Collab</NavLink>
                <NavLink to="/products" currentPath={location.pathname} mobile>Sell</NavLink>
                {user ? (
                  <>
                    <span className="text-gray-700">Hi {user.name}</span>
                    <NavButton mobile onClick={handleLogout}>
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </NavButton>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <NavButton mobile>Login</NavButton>
                    </Link>
                    <Link to="/signup">
                      <NavButton mobile primary>Sign Up</NavButton>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  )
}

const NavLink = ({ to, children, currentPath, mobile }) => (
  <Link
    to={to}
    className={`${
      currentPath === to ? "text-green-500" : "text-gray-700"
    } hover:text-green-500 transition-colors ${mobile ? "text-lg py-2" : "text-base"}`}
  >
    {children}
  </Link>
)

const NavButton = ({ children, primary, mobile, onClick }) => {
  const baseStyle = `inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${
    mobile ? "w-full text-center" : ""
  }`
  const defaultStyle = `text-gray-700 hover:text-green-500 hover:bg-green-50 ${primary ? "ml-2" : ""}`
  const primaryStyle = `text-white bg-green-500 hover:bg-green-600`

  return (
    <motion.button
      className={`${baseStyle} ${primary ? primaryStyle : defaultStyle}`}
      whileHover={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: primary ? "rgba(255,255,255,0.1)" : "rgba(34,197,94,0.1)",
          originX: 0,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export default Navbar





// import { useState, useEffect } from "react"
// import { Menu, LogOut, Globe } from "lucide-react"
// import { motion, useScroll, useSpring } from "framer-motion"
// import { Link, useLocation } from "react-router-dom"
// import logo from "../assets/svg/logo.svg"

// const NavLink = ({ to, currentPath, children, mobile }) => {
//   const active = currentPath === to
//   const className = `block px-4 py-2 text-gray-700 hover:text-green-500 transition-colors ${active ? "font-bold" : ""} ${mobile ? "text-center" : ""}`
//   return (
//     <Link to={to} className={className}>
//       {children}
//     </Link>
//   )
// }

// const NavButton = ({ children, primary, mobile, onClick }) => {
//   const className = `inline-flex items-center px-4 py-2 text-white font-medium rounded-md ${primary ? "bg-green-500 hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300 text-gray-700"} transition-colors ${mobile ? "w-full justify-center" : ""}`
//   return (
//     <button onClick={onClick} className={className}>
//       {children}
//     </button>
//   )
// }

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const { scrollYProgress } = useScroll()
//   const location = useLocation()

//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   })

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }

//     // Initialize Google Translate
//     const script = document.createElement("script")
//     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//     script.async = true
//     document.body.appendChild(script)

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,hi,pa", // English, Hindi, Punjabi
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element",
//       )
//     }

//     return () => {
//       document.body.removeChild(script)
//       delete window.googleTranslateElementInit
//     }
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     setUser(null)
//     window.location.href = "/login"
//   }

//   return (
//     <>
//       <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-green-500 origin-left z-50" style={{ scaleX }} />

//       <nav className="fixed top-0 w-full bg-white shadow-md z-40">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex justify-between items-center">
//             <img src={logo || "/placeholder.svg"} alt="Logo" className="h-16" />

//             <div className="hidden md:flex items-center space-x-6">
//               <NavLink to="/" currentPath={location.pathname}>
//                 Home
//               </NavLink>
//               <NavLink to="/about" currentPath={location.pathname}>
//                 About
//               </NavLink>
//               <NavLink to="/services" currentPath={location.pathname}>
//                 Services
//               </NavLink>
//               <NavLink to="/collab" currentPath={location.pathname}>
//                 Collab
//               </NavLink>
//               <NavLink to="/products" currentPath={location.pathname}>
//                 Sell
//               </NavLink>

//               {user ? (
//                 <>
//                   <span className="text-gray-700">Hi {user.name}</span>
//                   <NavButton onClick={handleLogout}>
//                     <LogOut className="w-5 h-5 mr-2" />
//                     Logout
//                   </NavButton>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login">
//                     <NavButton>Login</NavButton>
//                   </Link>
//                   <Link to="/signup">
//                     <NavButton primary>Sign Up</NavButton>
//                   </Link>
//                 </>
//               )}

//               <div className="flex items-center space-x-2">
//                 <Globe className="w-5 h-5 text-gray-700" />
//                 <div id="google_translate_element"></div>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-gray-700 hover:text-green-500 transition-colors"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>

//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="md:hidden mt-4 pb-4"
//             >
//               <div className="flex flex-col space-y-2">
//                 <NavLink to="/" currentPath={location.pathname} mobile>
//                   Home
//                 </NavLink>
//                 <NavLink to="/about" currentPath={location.pathname} mobile>
//                   About
//                 </NavLink>
//                 <NavLink to="/services" currentPath={location.pathname} mobile>
//                   Services
//                 </NavLink>
//                 <NavLink to="/collab" currentPath={location.pathname} mobile>
//                   Collab
//                 </NavLink>
//                 <NavLink to="/products" currentPath={location.pathname} mobile>
//                   Sell
//                 </NavLink>
//                 {user ? (
//                   <>
//                     <span className="text-gray-700">Hi {user.name}</span>
//                     <NavButton mobile onClick={handleLogout}>
//                       <LogOut className="w-5 h-5 mr-2" />
//                       Logout
//                     </NavButton>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login">
//                       <NavButton mobile>Login</NavButton>
//                     </Link>
//                     <Link to="/signup">
//                       <NavButton mobile primary>
//                         Sign Up
//                       </NavButton>
//                     </Link>
//                   </>
//                 )}
//                 <div className="flex items-center space-x-2 px-4 py-2">
//                   <Globe className="w-5 h-5 text-gray-700" />
//                   <div id="google_translate_element_mobile"></div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar

