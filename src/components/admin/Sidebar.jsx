import React from "react"
import { BarChart, Users, Tractor, Package } from "lucide-react"

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: BarChart },
    { id: "collaborators", label: "Collaborators", icon: Users },
    { id: "farmers", label: "Farmers", icon: Tractor },
    { id: "products", label: "Products", icon: Package },
  ]

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <ul className="space-y-2 p-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`w-full flex items-center p-2 rounded-md ${
                activeTab === item.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar

