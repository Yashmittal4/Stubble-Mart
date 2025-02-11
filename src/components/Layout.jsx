import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
<Footer/>      
    </>
  )
}

export default Layout









// import React, { useEffect } from "react"
// import Navbar from "./Navbar"
// import Footer from "./Footer"
// import { Outlet } from "react-router-dom"
// import LanguageSelector from "./LanguageSelector"

// function Layout() {
//   useEffect(() => {
//     const googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,hi,pa",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element",
//       )
//     }

//     const script = document.createElement("script")
//     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//     script.async = true
//     document.body.appendChild(script)

//     window.googleTranslateElementInit = googleTranslateElementInit

//     return () => {
//       document.body.removeChild(script)
//       delete window.googleTranslateElementInit
//     }
//   }, [])

//   return (
//     <>
//       <Navbar >
        
//       </Navbar>
//       <LanguageSelector />
//       <div id="google_translate_element" ></div>
//       <Outlet />
//       <Footer />
//     </>
//   )
// }

// export default Layout

