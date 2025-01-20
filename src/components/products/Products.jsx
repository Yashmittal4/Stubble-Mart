import React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import SearchBar from "./SearchBar"
import ProductCard from "./ProductCard"
import { products } from "../utils"

export default function Products() {
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
          <SearchBar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

