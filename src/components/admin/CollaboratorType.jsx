import React from "react"
import { useParams } from "react-router-dom"

function CollaboratorType() {
  const { type } = useParams()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{type.charAt(0).toUpperCase() + type.slice(1)} Collaborators</h1>
      {/* Add collaborator management functionality here */}
    </div>
  )
}

export default CollaboratorType

