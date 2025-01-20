import React from "react"
import { Search, Mic } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="font-raleway text-black px-4 mt-10 mx-auto">
      <div className="relative mb-4">
        <input
          type="search"
          placeholder="Search....."
          className="w-full py-2 px-4 bg-gray-100 text-black rounded-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          <Search className="h-5 w-5 text-black mr-2" />
          <Mic className="h-5 w-5 text-black" />
        </div>
      </div>
    </div>
  )
}

