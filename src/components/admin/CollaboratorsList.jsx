import React, { useState, useEffect } from "react"
import axios from "axios"
import { Eye, CheckCircle, XCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"
import { calculateRecommendationScore, getTopRecommendation } from "./Multi_level_feedback_queue/stubblePurchasingQueue"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

const CollaboratorsList = () => {
  const [collaborators, setCollaborators] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [selectedCollaborator, setSelectedCollaborator] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage] = useState(10)
  const [recommendedCompany, setRecommendedCompany] = useState(null)

  useEffect(() => {
    fetchCollaborators()
  }, [])

  const fetchCollaborators = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/collaborators")
      setCollaborators(response.data)
    } catch (error) {
      console.error("Error fetching collaborators:", error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/collaborators/${id}`, { status: newStatus })
      fetchCollaborators()
    } catch (error) {
      console.error("Error updating collaborator status:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/collaborators/${id}`)
      fetchCollaborators()
    } catch (error) {
      console.error("Error deleting collaborator:", error)
    }
  }

  const evaluateRecommendations = () => {
    const scoredCollaborators = calculateRecommendationScore(collaborators)
    setCollaborators(scoredCollaborators)
    const topRecommendation = getTopRecommendation(collaborators)
    setRecommendedCompany(topRecommendation)
  }

  const filteredCollaborators = collaborators.filter(
    (collaborator) =>
      collaborator.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || collaborator.status === statusFilter) &&
      (typeFilter === "All" || collaborator.collaborationType === typeFilter),
  )

  const collaborationTypes = ["Stubble purchasing company", "Machine rental", "Transportation company", "Agriculture shops"]

  const getCollaborationTypeStats = () => {
    const stats = collaborationTypes.map((type) => ({
      type,
      count: collaborators.filter((c) => c.collaborationType === type).length,
    }))
    return stats
  }

  const collaborationTypeStats = getCollaborationTypeStats()

  const chartData = {
    labels: collaborationTypeStats.map((stat) => stat.type),
    datasets: [
      {
        label: "Number of Collaborators",
        data: collaborationTypeStats.map((stat) => stat.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = filteredCollaborators.slice(indexOfFirstEntry, indexOfLastEntry)
  const totalPages = Math.ceil(filteredCollaborators.length / entriesPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Collaborators</h1>
      <div className="flex justify-between items-center">
        <input
          type="search"
          placeholder="Search collaborators..."
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
        <select
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          {collaborationTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          onClick={evaluateRecommendations}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Evaluate Recommendations
        </button>
      </div>
      {recommendedCompany && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p className="font-bold">Recommended Stubble Purchasing Company:</p>
          <p>
            {recommendedCompany.companyName} (Average Price: ₹{recommendedCompany.avgPrice.toFixed(2)})
          </p>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Collaboration Type Distribution</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Company Name</th>
            <th className="px-4 py-2 text-left">Collaboration Type</th>
            <th className="px-4 py-2 text-left">Contact Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Recommendation Score</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((collaborator) => (
            <tr key={collaborator._id} className="border-t">
              <td className="px-4 py-2">{collaborator.companyName}</td>
              <td className="px-4 py-2">{collaborator.collaborationType}</td>
              <td className="px-4 py-2">{collaborator.name}</td>
              <td className="px-4 py-2">{collaborator.email}</td>
              <td className="px-4 py-2">{collaborator.status}</td>
              <td className="px-4 py-2">
                {collaborator.collaborationType === "Stubble purchasing company" && collaborator.status === "Pending"
                  ? collaborator.recommendationScore || "Not evaluated"
                  : "N/A"}
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => setSelectedCollaborator(collaborator)}
                  >
                    <Eye className="h-5 w-5 text-blue-500" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => handleStatusChange(collaborator._id, "Accepted")}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full"
                    onClick={() => handleStatusChange(collaborator._id, "Rejected")}
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(collaborator._id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredCollaborators.length)} of{" "}
          {filteredCollaborators.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === number ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      {selectedCollaborator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedCollaborator.companyName}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Collaboration Type:</strong> {selectedCollaborator.collaborationType}
                </p>
                <p>
                  <strong>Contact Name:</strong> {selectedCollaborator.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCollaborator.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCollaborator.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {selectedCollaborator.companyAddress}
                </p>
                <p>
                  <strong>Description:</strong> {selectedCollaborator.companyDescription}
                </p>
                <p>
                  <strong>Status:</strong> {selectedCollaborator.status}
                </p>
                {selectedCollaborator.collaborationType === "Stubble purchasing company" && (
                  <p>
                    <strong>Recommendation Score:</strong> {selectedCollaborator.recommendationScore || "Not evaluated"}
                  </p>
                )}
              </div>
              <div>
                {selectedCollaborator.collaborationType === "Stubble purchasing company" && (
                  <div>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Crop Details</h3>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Crop</th>
                          <th className="text-left">Price Range (From)</th>
                          <th className="text-left">Price Range (To)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCollaborator.crops.map((crop, index) => (
                          <tr key={index}>
                            <td>{crop.cropName}</td>
                            <td>{crop.priceRangeFrom}</td>
                            <td>{crop.priceRangeTo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Price Range Chart</h4>
                      <Line
                        data={{
                          labels: selectedCollaborator.crops.map((crop) => crop.cropName),
                          datasets: [
                            {
                              label: "Price Range (From)",
                              data: selectedCollaborator.crops.map((crop) => crop.priceRangeFrom),
                              borderColor: "rgba(75, 192, 192, 1)",
                              backgroundColor: "rgba(75, 192, 192, 0.2)",
                            },
                            {
                              label: "Price Range (To)",
                              data: selectedCollaborator.crops.map((crop) => crop.priceRangeTo),
                              borderColor: "rgba(255, 99, 132, 1)",
                              backgroundColor: "rgba(255, 99, 132, 0.2)",
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: "Price (INR)",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setSelectedCollaborator(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollaboratorsList

