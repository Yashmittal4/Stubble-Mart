

import React, { useState, useEffect } from "react"
import axios from "axios"
import { Eye, CheckCircle, XCircle, Trash2 } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const FarmersList = () => {
  const [farmers, setFarmers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [chartData, setChartData] = useState({
    cropDistribution: [],
    farmerStatusDistribution: [],
  })

  useEffect(() => {
    fetchFarmers()
    fetchChartData()
  }, [])

  const fetchFarmers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/farmers")
      setFarmers(response.data)
    } catch (error) {
      console.error("Error fetching farmers:", error)
    }
  }

  const fetchChartData = async () => {
    try {
      const [cropDistribution, farmerStatusDistribution] = await Promise.all([
        axios.get("http://localhost:5000/api/stats/crop-distribution"),
        axios.get("http://localhost:5000/api/stats/farmer-status-distribution"),
      ])

      setChartData({
        cropDistribution: cropDistribution.data,
        farmerStatusDistribution: farmerStatusDistribution.data,
      })
    } catch (error) {
      console.error("Error fetching chart data:", error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/farmers/${id}`, { status: newStatus })
      fetchFarmers()
    } catch (error) {
      console.error("Error updating farmer status:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/farmers/${id}`)
      fetchFarmers()
    } catch (error) {
      console.error("Error deleting farmer:", error)
    }
  }

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || farmer.status === statusFilter),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Farmers</h1>
      <div className="flex justify-between items-center">
        <input
          type="search"
          placeholder="Search farmers..."
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Crop Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.cropDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Farmer Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.farmerStatusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Address</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFarmers.map((farmer) => (
            <tr key={farmer._id} className="border-t">
              <td className="px-4 py-2">{farmer.name}</td>
              <td className="px-4 py-2">{farmer.email}</td>
              <td className="px-4 py-2">{farmer.phoneNumber}</td>
              <td className="px-4 py-2">{farmer.address}</td>
              <td className="px-4 py-2">{farmer.status}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setSelectedFarmer(farmer)}>
                    <Eye className="h-5 w-5 text-blue-500" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => handleStatusChange(farmer._id, "Accepted")}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => handleStatusChange(farmer._id, "Rejected")}
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(farmer._id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedFarmer.name}</h2>
            <p>
              <strong>Email:</strong> {selectedFarmer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedFarmer.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedFarmer.address}
            </p>
            <p>
              <strong>Status:</strong> {selectedFarmer.status}
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Crops</h3>
            <ul>
              {selectedFarmer.crops.map((crop, index) => (
                <li key={index}>
                  {crop.cropName} - {crop.landSize}
                </li>
              ))}
            </ul>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setSelectedFarmer(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FarmersList

