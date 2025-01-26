import React, { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Users, Tractor, Package } from "lucide-react"
import Sidebar from "./Sidebar"
import CollaboratorsList from "./CollaboratorsList"
import FarmersList from "./FarmersList"
import ProductsList from "./ProductsList"
import DashboardOverview from "./DashboardOverview"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "collaborators":
        return <CollaboratorsList />
      case "farmers":
        return <FarmersList />
      case "products":
        return <ProductsList />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <input
              type="search"
              placeholder="Search..."
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </header>
        <main className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard



