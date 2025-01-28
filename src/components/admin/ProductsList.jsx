import React, { useState, useEffect } from "react"
import axios from "axios"
import { Eye, Edit, Trash2 } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", description: "", minPrice: "", maxPrice: "", image: null })
  const [editingProduct, setEditingProduct] = useState(null)
  const [chartData, setChartData] = useState({
    productPriceDistribution: [],
    topSellingProducts: [],
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchProducts()
    fetchChartData()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products")
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchChartData = async () => {
    try {
      const [productPriceDistribution, topSellingProducts] = await Promise.all([
        axios.get("http://localhost:5000/api/stats/product-price-distribution"),
        axios.get("http://localhost:5000/api/stats/top-selling-products"),
      ])

      setChartData({
        productPriceDistribution: productPriceDistribution.data,
        topSellingProducts: topSellingProducts.data,
      })
    } catch (error) {
      console.error("Error fetching chart data:", error)
    }
  }

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
    return nameRegex.test(name)
  }

  const validateDescription = (description) => {
    const descriptionRegex = /^[a-zA-Z0-9#,\- ]+(?:\s[a-zA-Z0-9#,\- ]+)*$/
    return descriptionRegex.test(description)
  }

  const handleInputChange = (e, setFunction) => {
    const { name, value } = e.target
    setFunction((prev) => ({ ...prev, [name]: value }))

    let error = ""
    if (name === "name" && !validateName(value)) {
      error = "Name should only contain alphabets and single spaces between words."
    } else if (name === "description" && !validateDescription(value)) {
      error = "Description should contain only alphabets, numbers, #, -, , and single spaces."
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (Object.values(errors).some((error) => error !== "")) {
      return
    }
    try {
      const formData = new FormData()
      formData.append("name", newProduct.name)
      formData.append("description", newProduct.description)
      formData.append("minPrice", newProduct.minPrice)
      formData.append("maxPrice", newProduct.maxPrice)
      formData.append("image", newProduct.image)

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setShowAddForm(false)
      setNewProduct({ name: "", description: "", minPrice: "", maxPrice: "", image: null })
      fetchProducts()
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const handleEditProduct = async (e) => {
    e.preventDefault()
    if (Object.values(errors).some((error) => error !== "")) {
      return
    }
    try {
      const formData = new FormData()
      formData.append("name", editingProduct.name)
      formData.append("description", editingProduct.description)
      formData.append("minPrice", editingProduct.minPrice)
      formData.append("maxPrice", editingProduct.maxPrice)
      if (editingProduct.image instanceof File) {
        formData.append("image", editingProduct.image)
      }

      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      console.error("Error editing product:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`)
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="flex justify-between items-center">
        <input
          type="search"
          placeholder="Search products..."
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add Product"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Product Price Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.productPriceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.topSellingProducts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {showAddForm && (
        <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : ""
                }`}
                required
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                Minimum Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={newProduct.minPrice}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Maximum Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={newProduct.maxPrice}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                className="mt-1 block w-full"
                accept="image/*"
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Add Product
          </button>
        </form>
      )}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Price Range</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">
                ${product.minPrice} - ${product.maxPrice}
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <Eye className="h-5 w-5 text-blue-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => setEditingProduct(product)}>
                    <Edit className="h-5 w-5 text-green-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(product._id)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingProduct.name}
                  onChange={(e) => handleInputChange(e, setEditingProduct)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editingProduct.description}
                  onChange={(e) => handleInputChange(e, setEditingProduct)}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
              <div>
                <label htmlFor="edit-minPrice" className="block text-sm font-medium text-gray-700">
                  Minimum Price
                </label>
                <input
                  type="number"
                  id="edit-minPrice"
                  name="minPrice"
                  value={editingProduct.minPrice}
                  onChange={(e) => handleInputChange(e, setEditingProduct)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-maxPrice" className="block text-sm font-medium text-gray-700">
                  Maximum Price
                </label>
                <input
                  type="number"
                  id="edit-maxPrice"
                  name="maxPrice"
                  value={editingProduct.maxPrice}
                  onChange={(e) => handleInputChange(e, setEditingProduct)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="edit-image"
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] })}
                  className="mt-1 block w-full"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsList

