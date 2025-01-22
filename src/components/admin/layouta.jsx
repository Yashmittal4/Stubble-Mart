// import React, { useState } from "react"
// import { Outlet } from "react-router-dom"
// import Sidebar from "./Sidebar"
// import { Menu } from "lucide-react"

// function Button({ children, onClick, variant, size, className }) {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//   const variantClasses = {
//     ghost: "hover:bg-accent hover:text-accent-foreground",
//     // Add other variants as needed
//   }
//   const sizeClasses = {
//     icon: "h-9 w-9",
//     // Add other sizes as needed
//   }

//   return (
//     <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} onClick={onClick}>
//       {children}
//     </button>
//   )
// }

// function Layouta() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="flex h-screen bg-gray-100 font-raleway">
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white shadow-sm lg:hidden">
//           <div className="px-4 py-2">
//             <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
//               <Menu className="h-6 w-6" />
//             </Button>
//           </div>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Layouta





import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { Menu } from "lucide-react"

function Button({ children, onClick, variant, size, className }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  const variantClasses = {
    ghost: "hover:bg-accent hover:text-accent-foreground",
    // Add other variants as needed
  }
  const sizeClasses = {
    icon: "h-9 w-9",
    // Add other sizes as needed
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 font-raleway">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="px-4 py-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout

