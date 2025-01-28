import React, { useState } from "react"
import { Check, ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react"
import axios from "axios"

const collaborationOptions = [
  "Stubble purchasing company",
  "Machine rental",
  "Transportation company",
  "Agriculture shops",
]

const stepTitles = ["Company Information", "Company Details", "Confirmation"]

export default function CollaboratorForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    collaborationType: "Stubble purchasing company",
    companyName: "",
    name: "",
    email: "",
    phoneNumber: "",
    companyAddress: "",
    companyDescription: "",
    query: "",
    crops: [{ cropName: "", priceRangeFrom: "", priceRangeTo: "" }],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setValidationErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleCropChange = (index, field, value) => {
    const updatedCrops = [...formData.crops]
    updatedCrops[index][field] = value
    setFormData((prevData) => ({
      ...prevData,
      crops: updatedCrops,
    }))
    setValidationErrors((prev) => ({ ...prev, [`crops.${index}.${field}`]: "" }))
  }

  const addCrop = () => {
    setFormData((prevData) => ({
      ...prevData,
      crops: [...prevData.crops, { cropName: "", priceRangeFrom: "", priceRangeTo: "" }],
    }))
  }

  const removeCrop = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      crops: prevData.crops.filter((_, i) => i !== index),
    }))
  }


  const validateForm = () => {
    const errors = {}
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
    const addressRegex = /^[a-zA-Z0-9#,-]+(?:\s[a-zA-Z0-9#,-]+)*$/
  
    if (step === 1) {
      if (!formData.companyName.trim()) errors.companyName = "Company name is required"
      else if (!nameRegex.test(formData.companyName))
        errors.companyName = "Company name should contain only alphabets and single spaces"
  
      if (!formData.name.trim()) errors.name = "Name is required"
      else if (!nameRegex.test(formData.name)) errors.name = "Name should contain only alphabets and single spaces"
  
      if (!formData.email.trim()) errors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
  
      if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = "Phone number should be 10 digits"
  
      if (!formData.companyAddress.trim()) errors.companyAddress = "Company address is required"
      else if (!addressRegex.test(formData.companyAddress))
        errors.companyAddress = "Address should contain only alphabets, numbers, #, -, , and single spaces"
    } else if (step === 2) {
      if (formData.collaborationType === "Stubble purchasing company") {
        formData.crops.forEach((crop, index) => {
          if (!crop.cropName.trim()) errors[`crops.${index}.cropName`] = "Crop name is required"
          else if (!nameRegex.test(crop.cropName))
            errors[`crops.${index}.cropName`] = "Crop name should contain only alphabets and single spaces"
  
          if (!crop.priceRangeFrom) errors[`crops.${index}.priceRangeFrom`] = "Price range from is required"
          if (!crop.priceRangeTo) errors[`crops.${index}.priceRangeTo`] = "Price range to is required"
          if (Number(crop.priceRangeFrom) >= Number(crop.priceRangeTo)) {
            errors[`crops.${index}.priceRangeTo`] = "Price range to should be greater than price range from"
          }
        })
      }
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  

  const handleNext = async () => {
    if (validateForm()) {
      if (step < 2) {
        setStep(step + 1)
      } else if (step === 2) {
        setIsSubmitting(true)
        setSubmitError(null)
        try {
          await axios.post("http://localhost:5000/api/collaborators", formData)
          console.log("Form submitted successfully")
          setStep(3)
        } catch (error) {
          console.error("Error submitting form:", error)
          setSubmitError("An error occurred while submitting the form. Please try again.")
        } finally {
          setIsSubmitting(false)
        }
      }
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen font-raleway flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="relative mb-12">
          <div className="flex justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${step > index ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"} mb-2 transition-all duration-300 ease-in-out transform ${step === index + 1 ? "scale-110 ring-4 ring-emerald-200" : ""}`}
                >
                  {step > index ? <Check className="w-6 h-6" /> : index + 1}
                </div>
                <span
                  className={`text-lg font-medium ${step > index ? "text-emerald-600" : "text-gray-600"} transition-colors duration-300`}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-6 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${((step - 1) / (stepTitles.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div>
          {step === 1 && (
            <div className="grid md:grid-cols-1 mx-auto gap-8">
              <div className="space-y-6">
                <div className="relative">
                  <select
                    name="collaborationType"
                    value={formData.collaborationType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {collaborationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {["companyName", "name", "email", "phoneNumber", "companyAddress"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                      {field.charAt(0).toUpperCase() +
                        field
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${validationErrors[field] ? "border-red-500" : "border-gray-300"} rounded-md`}
                    />
                    {validationErrors[field] && <p className="text-red-500 text-sm">{validationErrors[field]}</p>}
                  </div>
                ))}
                <button type="button" onClick={handleNext} className="w-full bg-emerald-600 text-white p-2 rounded-md">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 className="font-semibold text-xl mb-4 text-emerald-700">Company Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {["collaborationType", "companyName", "name", "email", "phoneNumber", "companyAddress"].map(
                    (field) => (
                      <p key={field} className="flex items-start">
                        <span className="font-medium text-gray-700 mr-2">
                          {field.charAt(0).toUpperCase() +
                            field
                              .slice(1)
                              .replace(/([A-Z])/g, " $1")
                              .trim()}
                          :
                        </span>
                        <span className="text-gray-600">{formData[field]}</span>
                      </p>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
                    Describe your company
                  </label>
                  <textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out h-32 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                    Any queries?
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out h-24 resize-none"
                  />
                </div>
                {formData.collaborationType === "Stubble purchasing company" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-emerald-700">Crop Information</h4>
                    {formData.crops.map((crop, index) => (
                      <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                        <div className="space-y-2">
                          <label
                            htmlFor={`crops.${index}.cropName`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Crop Name
                          </label>
                          <input
                            value={crop.cropName}
                            onChange={(e) => handleCropChange(index, "cropName", e.target.value)}
                            className={`w-full p-2 border ${validationErrors[`crops.${index}.cropName`] ? "border-red-500" : "border-gray-300"} rounded-md`}
                          />
                          {validationErrors[`crops.${index}.cropName`] && (
                            <p className="text-red-500 text-sm">{validationErrors[`crops.${index}.cropName`]}</p>
                          )}
                        </div>
                        <div className="flex space-x-4">
                          <div className="space-y-2 w-1/2">
                            <label
                              htmlFor={`crops.${index}.priceRangeFrom`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price Range From
                            </label>
                            <input
                              type="number"
                              value={crop.priceRangeFrom}
                              onChange={(e) => handleCropChange(index, "priceRangeFrom", e.target.value)}
                              className={`w-full p-2 border ${validationErrors[`crops.${index}.priceRangeFrom`] ? "border-red-500" : "border-gray-300"} rounded-md`}
                            />
                            {validationErrors[`crops.${index}.priceRangeFrom`] && (
                              <p className="text-red-500 text-sm">
                                {validationErrors[`crops.${index}.priceRangeFrom`]}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2 w-1/2">
                            <label
                              htmlFor={`crops.${index}.priceRangeTo`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price Range To
                            </label>
                            <input
                              type="number"
                              value={crop.priceRangeTo}
                              onChange={(e) => handleCropChange(index, "priceRangeTo", e.target.value)}
                              className={`w-full p-2 border ${validationErrors[`crops.${index}.priceRangeTo`] ? "border-red-500" : "border-gray-300"} rounded-md`}
                            />
                            {validationErrors[`crops.${index}.priceRangeTo`] && (
                              <p className="text-red-500 text-sm">{validationErrors[`crops.${index}.priceRangeTo`]}</p>
                            )}
                          </div>
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeCrop(index)}
                            className="mt-2 bg-red-500 text-white p-2 rounded-md"
                          >
                            <Trash2 className="w-4 h-4 mr-2 inline" />
                            Remove Crop
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addCrop} className="mt-4 bg-gray-200 text-gray-700 p-2 rounded-md">
                      <Plus className="w-4 h-4 mr-2 inline" />
                      Add Another Crop
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 p-2 rounded-md">
                  <ChevronLeft className="w-5 h-5 mr-2 inline" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`bg-emerald-600 text-white p-2 rounded-md ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitError && <p className="text-red-500 text-center mt-4">{submitError}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="bg-emerald-500 rounded-full p-6 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
                  <Check className="text-white w-20 h-20" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-emerald-700">Thank You for Collaborating!</h2>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                We're excited to work with you. We'll contact you soon to discuss the next steps and how we can grow
                together.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

