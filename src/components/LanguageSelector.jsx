// import React from "react"
// import { Globe } from "lucide-react"

// const LanguageSelector = () => {
//   const changeLanguage = (lang) => {
//     const googleTranslateElement = document.querySelector(".goog-te-combo")
//     if (googleTranslateElement) {
//       googleTranslateElement.value = lang
//       googleTranslateElement.dispatchEvent(new Event("change"))
//     }
//   }

//   return (
//     <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-80 rounded-full px-3 py-1 shadow-md">
//       <Globe className="text-gray-600 mr-2" size={18} />
//       <button
//         onClick={() => changeLanguage("en")}
//         className="text-sm font-medium text-gray-700 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors"
//       >
//         EN
//       </button>
//       <button
//         onClick={() => changeLanguage("hi")}
//         className="text-sm font-medium text-gray-700 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors"
//       >
//         हि
//       </button>
//       <button
//         onClick={() => changeLanguage("pa")}
//         className="text-sm font-medium text-gray-700 hover:bg-gray-200 px-2 py-1 rounded-md transition-colors"
//       >
//         ਪੰ
//       </button>
//     </div>
//   )
// }

// export default LanguageSelector

import React, { useState, useEffect, useRef } from "react"
import { Globe, ChevronDown } from "lucide-react"

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState("EN")
  const dropdownRef = useRef(null)

  const languages = [
    { code: "en", label: "EN", fullName: "English" },
    { code: "hi", label: "हि", fullName: "Hindi" },
    { code: "pa", label: "ਪੰ", fullName: "Punjabi" },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleLanguageChange = () => {
      const googleCombo = document.querySelector(".goog-te-combo")
      if (googleCombo) {
        const selectedLangCode = googleCombo.value
        const lang = languages.find((l) => l.code === selectedLangCode)
        if (lang) {
          setSelectedLang(lang.label)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("google-translate-select", handleLanguageChange)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("google-translate-select", handleLanguageChange)
    }
  }, [])

  const changeLanguage = (lang) => {
    const googleTranslateElement = document.querySelector(".goog-te-combo")
    if (googleTranslateElement) {
      googleTranslateElement.value = lang
      googleTranslateElement.dispatchEvent(new Event("change"))
    }
    setSelectedLang(languages.find((l) => l.code === lang).label)
    setIsOpen(false)
  }

  return (
    <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center bg-white bg-opacity-80 rounded-full px-3 py-2 shadow-md hover:bg-opacity-100 transition-colors"
        >
          <Globe className="text-gray-600 mr-2" size={18} />
          <span className="text-sm font-medium text-gray-700 mr-1">{selectedLang}</span>
          <ChevronDown className="text-gray-600" size={16} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {lang.fullName} ({lang.label})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LanguageSelector

