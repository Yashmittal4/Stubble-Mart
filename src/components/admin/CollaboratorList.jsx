import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"

// Simulated API call
const fetchCollaborators = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, name: "Company A", type: "STUBBLE_PURCHASING_COMPANY", status: "APPROVED" },
    { id: 2, name: "Company B", type: "MACHINE_RENTAL", status: "PENDING" },
    { id: 3, name: "Company C", type: "TRANSPORTATION_COMPANY", status: "REJECTED" },
    { id: 4, name: "Company D", type: "AGRICULTURE_SHOPS", status: "APPROVED" },
  ]
}

function CollaboratorList() {
  const [collaborators, setCollaborators] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  useEffect(() => {
    const loadCollaborators = async () => {
      const data = await fetchCollaborators()
      setCollaborators(data)
    }
    loadCollaborators()
  }, [])

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredCollaborators = collaborators
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((c) => (filterType ? c.type === filterType : true))
    .filter((c) => (filterStatus ? c.status === filterStatus : true))
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Collaborators</h1>
      <div className="mb-4 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search collaborators..."
            className="w-full p-2 pl-8 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
        </div>
        <select className="p-2 border rounded" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="STUBBLE_PURCHASING_COMPANY">Stubble Purchasing</option>
          <option value="MACHINE_RENTAL">Machine Rental</option>
          <option value="TRANSPORTATION_COMPANY">Transportation</option>
          <option value="AGRICULTURE_SHOPS">Agriculture Shops</option>
        </select>
        <select className="p-2 border rounded" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <Filter className="h-6 w-6 text-gray-400" />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">
              <button onClick={() => handleSort("name")} className="font-bold flex items-center">
                Name
                {sortField === "name" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </button>
            </th>
            <th className="p-2 text-left">
              <button onClick={() => handleSort("type")} className="font-bold flex items-center">
                Type
                {sortField === "type" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </button>
            </th>
            <th className="p-2 text-left">
              <button onClick={() => handleSort("status")} className="font-bold flex items-center">
                Status
                {sortField === "status" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </button>
            </th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollaborators.map((collaborator) => (
            <tr key={collaborator.id} className="border-b">
              <td className="p-2">{collaborator.name}</td>
              <td className="p-2">{collaborator.type.replace(/_/g, " ")}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    collaborator.status === "APPROVED"
                      ? "bg-green-200 text-green-800"
                      : collaborator.status === "PENDING"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                  }`}
                >
                  {collaborator.status}
                </span>
              </td>
              <td className="p-2">
                <Link to={`/admin/collaborators/${collaborator.id}`} className="text-blue-500 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CollaboratorList

