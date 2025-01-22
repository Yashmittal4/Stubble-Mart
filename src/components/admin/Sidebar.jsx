// import React from "react"
// import { Link } from "react-router-dom"
// import { BarChart3, ShoppingCart, Tractor, Truck, Store, Users, Package, User, X, Trash } from "lucide-react"

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

// function Sidebar({ open, setOpen }) {
//   return (
//     <>
//       <div
//         className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${open ? "block" : "hidden"}`}
//         onClick={() => setOpen(false)}
//       ></div>

//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${
//           open ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
//         }`}
//       >
//         <div className="flex items-center justify-between flex-shrink-0 p-4">
//           <span className="text-xl font-semibold">StubbleMart</span>
//           <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="lg:hidden">
//             <X className="h-6 w-6" />
//           </Button>
//         </div>
//         <nav className="mt-5 flex flex-col justify-between h-[calc(100vh-80px)]">
//           <div>
//             <NavItem href="/admin" icon={BarChart3}>
//               Dashboard
//             </NavItem>
//             <NavItem href="/admin/collaborator/stubble-purchasing" icon={ShoppingCart}>
//               Stubble Purchasing
//             </NavItem>
//             <NavItem href="/admin/collaborator/machine-rental" icon={Tractor}>
//               Machine Rental
//             </NavItem>
//             <NavItem href="/admin/collaborator/transportation" icon={Truck}>
//               Transportation
//             </NavItem>
//             <NavItem href="/admin/collaborator/agri-shops" icon={Store}>
//               Agriculture Shops
//             </NavItem>
//             <NavItem href="/admin/farmers" icon={Users}>
//               Farmers
//             </NavItem>
//             <NavItem href="/admin/products" icon={Package}>
//               Products
//             </NavItem>
//             <NavItem href="/admin/profile" icon={User}>
//               Admin Profile
//             </NavItem>
//           </div>
//           <div>
//             <NavItem href="/admin/recycle-bin" icon={Trash}>
//               Recycle Bin
//             </NavItem>
//           </div>
//         </nav>
//       </div>
//     </>
//   )
// }

// function NavItem({ href, icon: Icon, children }) {
//   return (
//     <Link to={href} className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
//       <Icon className="h-5 w-5 mr-3" />
//       {children}
//     </Link>
//   )
// }

// export default Sidebar



import React from "react"
import { Link, useLocation } from "react-router-dom"
import { BarChart3, Users, Package, Trash, X } from "lucide-react"

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

function Sidebar({ open, setOpen }) {
  const location = useLocation()

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${
          open ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        }`}
      >
        <div className="flex items-center justify-between flex-shrink-0 p-4">
          <span className="text-xl font-semibold">StubbleMart Admin</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-5 flex flex-col justify-between h-[calc(100vh-80px)]">
          <div>
            <NavItem href="/admin" icon={BarChart3} active={isActive("/admin")}>
              Dashboard
            </NavItem>
            <NavItem href="/admin/collaborators" icon={Users} active={isActive("/admin/collaborators")}>
              Collaborators
            </NavItem>
            <NavItem href="/admin/farmers" icon={Users} active={isActive("/admin/farmers")}>
              Farmers
            </NavItem>
            <NavItem href="/admin/products" icon={Package} active={isActive("/admin/products")}>
              Products
            </NavItem>
          </div>
          <div>
            <NavItem href="/admin/recycle-bin" icon={Trash} active={isActive("/admin/recycle-bin")}>
              Recycle Bin
            </NavItem>
          </div>
        </nav>
      </div>
    </>
  )
}

function NavItem({ href, icon: Icon, children, active }) {
  return (
    <Link
      to={href}
      className={`flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100 font-semibold" : ""}`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {children}
    </Link>
  )
}

export default Sidebar

