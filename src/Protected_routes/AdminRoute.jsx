import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const AdminRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user || user.email !== "yashmittal4949@gmail.com") {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default AdminRoute

