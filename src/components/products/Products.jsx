

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import SearchBar from "./SearchBar"
import ProductCard from "./ProductCard"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async (searchTerm = "") => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/products${searchTerm ? `?search=${searchTerm}` : ""}`)
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      setError("Error fetching products. Please try again later.")
      setLoading(false)
    }
  }

  const handleSearch = (searchTerm) => {
    fetchProducts(searchTerm)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="min-h-screen px-4 md:px-20 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link to="/">
              <ArrowLeft className="h-6 w-6 text-gray-500 mr-2" />
            </Link>
            <h1 className="text-2xl font-semibold font-raleway">
              Search Your <span className="text-green-600">Stubble</span>
            </h1>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <ProductCard
                imgUrl={`http://localhost:5000/${product.image}`}
                name={product.name}
                description={product.description}
                minPrice={product.minPrice}
                maxPrice={product.maxPrice}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


