import React, { useState } from "react"
import { Search, Mic } from "lucide-react"

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className="font-raleway text-black px-4 mt-10 mx-auto">
      <form onSubmit={handleSearch} className="relative mb-4">
        <input
          type="search"
          placeholder="Search....."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 bg-gray-100 text-black rounded-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          <button type="submit" className="mr-2">
            <Search className="h-5 w-5 text-black" />
          </button>
          <Mic className="h-5 w-5 text-black" />
        </div>
      </form>
    </div>
  )
}

