import React from "react"

export default function ProductCard({ imgUrl, name, description, minPrice, maxPrice }) {
  return (
    <div className="font-raleway p-2 text-white flex justify-center items-center">
      <div className="bg-white rounded-sm shadow-lg overflow-hidden max-w-sm">
        <img src={imgUrl || "/placeholder.svg"} alt={`${name} image`} className="w-full h-48 object-cover" />
        <div className="p-4 bg-[#f5f5f5]">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <button className="flex-1 mr-2 border border-green-600 text-green-600 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md transition-colors">
              ₹{minPrice} - ₹{maxPrice}
            </button>
            <button className="flex-1 bg-green-600 text-white hover:bg-green-500 px-4 py-2 rounded-md transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

