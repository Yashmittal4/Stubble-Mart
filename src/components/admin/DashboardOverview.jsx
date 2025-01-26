

import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    collaborators: 0,
    farmers: 0,
    products: 0,
  })

  const [chartData, setChartData] = useState({
    monthlyStats: [],
    collaborationTypes: [],
    cropDistribution: [],
  })

  useEffect(() => {
    fetchStats()
    fetchChartData()
  }, [])

  const fetchStats = async () => {
    try {
      const [collaborators, farmers, products] = await Promise.all([
        axios.get("http://localhost:5000/api/collaborators"),
        axios.get("http://localhost:5000/api/farmers"),
        axios.get("http://localhost:5000/api/products"),
      ])

      setStats({
        collaborators: collaborators.data.length,
        farmers: farmers.data.length,
        products: products.data.length,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const fetchChartData = async () => {
    try {
      const [monthlyStats, collaborationTypes, cropDistribution] = await Promise.all([
        axios.get("http://localhost:5000/api/stats/monthly"),
        axios.get("http://localhost:5000/api/stats/collaboration-types"),
        axios.get("http://localhost:5000/api/stats/crop-distribution"),
      ])

      setChartData({
        monthlyStats: monthlyStats.data,
        collaborationTypes: collaborationTypes.data,
        cropDistribution: cropDistribution.data,
      })
    } catch (error) {
      console.error("Error fetching chart data:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Collaborators</h2>
          <p className="text-3xl font-bold">{stats.collaborators}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Farmers</h2>
          <p className="text-3xl font-bold">{stats.farmers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="collaborators" stroke="#8884d8" />
              <Line type="monotone" dataKey="farmers" stroke="#82ca9d" />
              <Line type="monotone" dataKey="products" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Collaboration Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.collaborationTypes}
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
      </div>
    </div>
  )
}

export default DashboardOverview



