import React, { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Phone, MessageCircle, Plus, X, Check } from "lucide-react"
import { products, relatedProducts } from "../utils"

const formSchema = {
  name: "",
  email: "",
  phone: "",
  address: "",
  state: "",
  city: "",
  additionalCrops: [],
}

const landSizeOptions = ["2-3", "4-8", "9-15", "16-50", "51+"]

export default function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(formSchema)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [mainCropLandSize, setMainCropLandSize] = useState("")
  const [mainCropCuttingServices, setMainCropCuttingServices] = useState(false)
  const [mainCropTransportationServices, setMainCropTransportationServices] = useState(false)

  const product = products.find((p) => p.id === productId) || relatedProducts.find((p) => p.id === productId)

  if (!product) {
    return <div>Product not found</div>
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddCrop = () => {
    setShowDropdown(true)
  }

  const handleCropSelect = (selectedCrop) => {
    setFormData((prevState) => ({
      ...prevState,
      additionalCrops: [
        ...prevState.additionalCrops,
        {
          id: selectedCrop.id,
          title: selectedCrop.title,
          landSize: "",
          cuttingServices: false,
          transportationServices: false,
        },
      ],
    }))
    setShowDropdown(false)
  }

  const handleAdditionalCropChange = (index, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      additionalCrops: prevState.additionalCrops.map((crop, i) => (i === index ? { ...crop, [field]: value } : crop)),
    }))
  }

  const handleRemoveCrop = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      additionalCrops: prevState.additionalCrops.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = {
      ...formData,
      mainCrop: {
        id: product.id,
        title: product.title,
        landSize: mainCropLandSize,
        cuttingServices: mainCropCuttingServices,
        transportationServices: mainCropTransportationServices,
      },
    }
    console.log("Order submitted:", orderData)
    setShowSuccessAnimation(true)
    setTimeout(() => {
      setShowSuccessAnimation(false)
      navigate("/products")
    }, 3000)
  }

  return (
    <div className="min-h-screen font-raleway py-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-sm overflow-hidden max-w-7xl mx-auto">
        <div className="p-6">
          <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to search
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={product.imgUrl || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-64 md:h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-green-600 mb-6">Price Range: ₹{product.priceRange}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Selected Crop:</h3>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h4 className="font-medium">{product.title}</h4>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">Land Size (acres)</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {landSizeOptions.map((size) => (
                          <label key={size} className="inline-flex items-center">
                            <input
                              type="radio"
                              name="mainCropLandSize"
                              value={size}
                              checked={mainCropLandSize === size}
                              onChange={(e) => setMainCropLandSize(e.target.value)}
                              className="form-radio text-green-500"
                              required
                            />
                            <span className="ml-2">{size}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={mainCropCuttingServices}
                          onChange={(e) => setMainCropCuttingServices(e.target.checked)}
                          className="form-checkbox text-green-500"
                        />
                        <span className="ml-2">Cutting Services</span>
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={mainCropTransportationServices}
                          onChange={(e) => setMainCropTransportationServices(e.target.checked)}
                          className="form-checkbox text-green-500"
                        />
                        <span className="ml-2">Transportation Services</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Additional Crops:</h3>
                  {formData.additionalCrops.map((crop, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{crop.title}</h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveCrop(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Land Size (acres)</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {landSizeOptions.map((size) => (
                            <label key={size} className="inline-flex items-center">
                              <input
                                type="radio"
                                name={`additionalCropLandSize-${index}`}
                                value={size}
                                checked={crop.landSize === size}
                                onChange={(e) => handleAdditionalCropChange(index, "landSize", e.target.value)}
                                className="form-radio text-green-500"
                                required
                              />
                              <span className="ml-2">{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={crop.cuttingServices}
                            onChange={(e) => handleAdditionalCropChange(index, "cuttingServices", e.target.checked)}
                            className="form-checkbox text-green-500"
                          />
                          <span className="ml-2">Cutting Services</span>
                        </label>
                      </div>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={crop.transportationServices}
                            onChange={(e) =>
                              handleAdditionalCropChange(index, "transportationServices", e.target.checked)
                            }
                            className="form-checkbox text-green-500"
                          />
                          <span className="ml-2">Transportation Services</span>
                        </label>
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
                      {products
                        .filter((p) => p.id !== productId)
                        .map((crop) => (
                          <button
                            key={crop.id}
                            type="button"
                            onClick={() => handleCropSelect(crop)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {crop.title}
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

          
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link to={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={relatedProduct.imgUrl || "/placeholder.svg"}
                        alt={relatedProduct.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{relatedProduct.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{relatedProduct.description.substring(0, 100)}...</p>
                        <p className="text-green-600 font-semibold">₹{relatedProduct.priceRange}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
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

