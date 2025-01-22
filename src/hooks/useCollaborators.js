import { useState, useEffect } from "react"
import PriorityQueue from "../utils/PriorityQueue"

const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const priorityQueue = new PriorityQueue()

  useEffect(() => {
    fetchCollaborators()
  }, [])

  const fetchCollaborators = async () => {
    try {
      setLoading(true)
      // Replace with actual API call
      const response = await fetch("/api/collaborators")
      const data = await response.json()
      setCollaborators(data)
      data.forEach((collaborator) => {
        if (collaborator.type === "STUBBLE_PURCHASING_COMPANY") {
          priorityQueue.enqueue(collaborator, collaborator.priorityScore)
        }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateCollaborator = async (id, updates) => {
    try {
      // Replace with actual API call
      const response = await fetch(`/api/collaborators/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      })
      const updatedCollaborator = await response.json()
      setCollaborators(collaborators.map((c) => (c.id === id ? updatedCollaborator : c)))
      if (updatedCollaborator.type === "STUBBLE_PURCHASING_COMPANY") {
        priorityQueue.enqueue(updatedCollaborator, updatedCollaborator.priorityScore)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return { collaborators, loading, error, updateCollaborator, priorityQueue }
}

export default useCollaborators

