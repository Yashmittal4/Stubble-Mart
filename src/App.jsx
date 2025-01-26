import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./Protected_routes/ProtectedRoute"
import AdminRoute from "./Protected_routes/AdminRoute"
import Layout from "./components/Layout"
import Home from "./components/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Collaborate from "./pages/Collaborate"
import SignupPage from "./components/auth/SignupPage"
import LoginPage from "./components/auth/LoginPage"
import ProductDetails from "./components/products/ProductDetails"
import Products from "./components/products/Products"
import AdminDashboard from "./components/admin/AdminDashboard"

import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route
              path="collab"
              element={
                <ProtectedRoute>
                  <Collaborate />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="products/:productId"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App


