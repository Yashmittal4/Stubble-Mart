import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Check, X, Trash2 } from "lucide-react"

// Simulated API call
const fetchCollaboratorDetails = async (id) => {
  // In a real application, this would be an API call
  return {
    id,
    name: "Company A",
    type: "STUBBLE_PURCHASING_COMPANY",
    status: "PENDING",
    email: "companya@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, State, ZIP",
    description: "A leading stubble purchasing company",
    crops: [
      { name: "Wheat", priceRangeFrom: 100, priceRangeTo: 150 },
      { name: "Rice", priceRangeFrom: 80, priceRangeTo: 120 },
    ],
  }
}

function CollaboratorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [collaborator, setCollaborator] = useState(null)

  useEffect(() => {
    const loadCollaboratorDetails = async () => {
      const data = await fetchCollaboratorDetails(id)
      setCollaborator(data)
    }
    loadCollaboratorDetails()
  }, [id])

  const handleApprove = () => {
    // In a real application, this would be an API call
    setCollaborator({ ...collaborator, status: "APPROVED" })
  }

  const handleReject = () => {
    // In a real application, this would be an API call
    setCollaborator({ ...collaborator, status: "REJECTED" })
  }

  const handleDelete = () => {
    // In a real application, this would be an API call
    alert("Collaborator moved to recycle bin")
    navigate("/admin/collaborators")
  }

  if (!collaborator) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{collaborator.name}</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Details</h2>
          <p>
            <strong>Type:</strong> {collaborator.type.replace(/_/g, " ")}
          </p>
          <p>
            <strong>Status:</strong> {collaborator.status}
          </p>
          <p>
            <strong>Email:</strong> {collaborator.email}
          </p>
          <p>
            <strong>Phone:</strong> {collaborator.phone}
          </p>
          <p>
            <strong>Address:</strong> {collaborator.address}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p>{collaborator.description}</p>
        </div>
      </div>
      {collaborator.type === "STUBBLE_PURCHASING_COMPANY" && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Crops</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Crop Name</th>
                <th className="p-2 text-left">Price Range</th>
              </tr>
            </thead>
            <tbody>
              {collaborator.crops.map((crop, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{crop.name}</td>
                  <td className="p-2">
                    ${crop.priceRangeFrom} - ${crop.priceRangeTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex space-x-2">
        {collaborator.status === "PENDING" && (
          <>
            <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded">
              <Check className="inline-block mr-2" /> Approve
            </button>
            <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded">
              <X className="inline-block mr-2" /> Reject
            </button>
          </>
        )}
        <button onClick={handleDelete} className="bg-gray-500 text-white px-4 py-2 rounded">
          <Trash2 className="inline-block mr-2" /> Delete
        </button>
      </div>
    </div>
  )
}

export default CollaboratorDetails

