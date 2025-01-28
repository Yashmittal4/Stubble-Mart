import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Phone, MessageCircle, Plus, X, Check } from "lucide-react"
import axios from "axios"

const landSizeOptions = ["2-3", "4-8", "9-15", "16-50", "51+"]
const serviceOptions = ["Cutting Service", "Transportation", "Machine Rental"]

export default function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    crops: [],
  })
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, allProductsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${productId}`),
          axios.get("http://localhost:5000/api/products"),
        ])
        setProduct(productResponse.data)
        setAllProducts(allProductsResponse.data)
        setFormData((prevState) => ({
          ...prevState,
          crops: [
            {
              cropName: productResponse.data.name,
              landSize: "",
              services: [],
            },
          ],
        }))
        setLoading(false)
      } catch (err) {
        setError("Error fetching data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
    return nameRegex.test(name)
  }

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/
    return phoneRegex.test(phoneNumber)
  }

  const validateAddress = (address) => {
    const addressRegex = /^[a-zA-Z0-9#,\- ]+(?:\s[a-zA-Z0-9#,\- ]+)*$/
    return addressRegex.test(address)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    let error = ""
    if (name === "name" && !validateName(value)) {
      error = "Name should only contain alphabets and single spaces between words."
    } else if (name === "phoneNumber" && !validatePhoneNumber(value)) {
      error = "Phone number should be exactly 10 digits."
    } else if (name === "address" && !validateAddress(value)) {
      error = "Address should contain only alphabets, numbers, #, -, , and single spaces."
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }))
  }

  const handleCropChange = (index, field, value) => {
    setFormData((prevState) => {
      const newCrops = [...prevState.crops]
      if (field === "services") {
        const services = [...(newCrops[index].services || [])]
        const serviceIndex = services.indexOf(value)
        if (serviceIndex > -1) {
          services.splice(serviceIndex, 1)
        } else {
          services.push(value)
        }
        newCrops[index] = { ...newCrops[index], services }
      } else {
        newCrops[index] = { ...newCrops[index], [field]: value }
      }
      return { ...prevState, crops: newCrops }
    })
  }

  const handleAddCrop = () => {
    setShowDropdown(!showDropdown)
  }

  const handleCropSelect = (crop) => {
    setFormData((prevState) => ({
      ...prevState,
      crops: [...prevState.crops, { cropName: crop.name, landSize: "", services: [] }],
    }))
    setShowDropdown(false)
  }

  const handleRemoveCrop = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      crops: prevState.crops.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!validateName(formData.name)) {
      newErrors.name = "Name should only contain alphabets and single spaces between words."
    }
    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should be exactly 10 digits."
    }
    if (!validateAddress(formData.address)) {
      newErrors.address = "Address should contain only alphabets, numbers, #, -, , and single spaces."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await axios.post("http://localhost:5000/api/farmers", formData)
      setShowSuccessAnimation(true)
      setTimeout(() => {
        setShowSuccessAnimation(false)
        navigate("/products")
      }, 3000)
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Error submitting order. Please try again.")
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (!product) return <div className="text-center py-10">Product not found</div>

  return (
    <div className="min-h-screen font-raleway py-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-sm overflow-hidden max-w-7xl mx-auto">
        <div className="p-6">
          <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to products
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-full h-64 md:h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-green-600 mb-6">
                Price Range: ₹{product.minPrice} - ₹{product.maxPrice}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Crops:</h3>
                  {formData.crops.map((crop, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{crop.cropName}</h4>
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCrop(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Land Size (acres)</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {landSizeOptions.map((size) => (
                            <label key={size} className="inline-flex items-center">
                              <input
                                type="radio"
                                name={`cropLandSize-${index}`}
                                value={size}
                                checked={crop.landSize === size}
                                onChange={(e) => handleCropChange(index, "landSize", e.target.value)}
                                className="form-radio text-green-500"
                                required
                              />
                              <span className="ml-2">{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Additional Services</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {serviceOptions.map((service) => (
                            <label key={service} className="inline-flex items-center">
                              <input
                                type="checkbox"
                                value={service}
                                checked={crop.services && crop.services.includes(service)}
                                onChange={() => handleCropChange(index, "services", service)}
                                className="form-checkbox h-5 w-5 text-green-500"
                              />
                              <span className="ml-2">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddCrop}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Another Stubble
                  </button>
                  {showDropdown && (
                    <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm">
                      {allProducts
                        .filter((p) => p._id !== productId && !formData.crops.some((crop) => crop.cropName === p.name))
                        .map((crop) => (
                          <button
                            key={crop._id}
                            type="button"
                            onClick={() => handleCropSelect(crop)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {crop.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-4">
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:1234567890"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showSuccessAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600">Thank you for your order. We'll get in touch with you soon.</p>
          </div>
        </div>
      )}
    </div>
  )
}

