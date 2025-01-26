


import React, { useState, useEffect } from "react"
import axios from "axios"
import { Eye, CheckCircle, XCircle, Trash2 } from "lucide-react"

const CollaboratorsList = () => {
  const [collaborators, setCollaborators] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [selectedCollaborator, setSelectedCollaborator] = useState(null)

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

  const filteredCollaborators = collaborators.filter(
    (collaborator) =>
      collaborator.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || collaborator.status === statusFilter) &&
      (typeFilter === "All" || collaborator.collaborationType === typeFilter),
  )

  const collaborationTypes = ["Stubble Purchasing company", "Machine Rental", "Transportation", "Agricultural Shops"]

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
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Company Name</th>
            <th className="px-4 py-2 text-left">Collaboration Type</th>
            <th className="px-4 py-2 text-left">Contact Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollaborators.map((collaborator) => (
            <tr key={collaborator._id} className="border-t">
              <td className="px-4 py-2">{collaborator.companyName}</td>
              <td className="px-4 py-2">{collaborator.collaborationType}</td>
              <td className="px-4 py-2">{collaborator.name}</td>
              <td className="px-4 py-2">{collaborator.email}</td>
              <td className="px-4 py-2">{collaborator.status}</td>
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
      {selectedCollaborator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedCollaborator.companyName}</h2>
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
            {selectedCollaborator.collaborationType === "Stubble Purchasing" && (
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
              </div>
            )}
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




