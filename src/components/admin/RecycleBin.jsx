// import React from "react"

// function RecycleBin() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Recycle Bin</h1>
//       {/* Add recycle bin functionality here */}
//     </div>
//   )
// }

// export default RecycleBin



import React, { useState, useEffect } from "react"
import { Trash2, RefreshCw } from "lucide-react"

// Simulated API call
const fetchDeletedItems = async () => {
  return [
    { id: 1, name: "Company A", type: "STUBBLE_PURCHASING_COMPANY", deletedAt: "2023-06-01" },
    { id: 2, name: "Company B", type: "MACHINE_RENTAL", deletedAt: "2023-06-02" },
    { id: 3, name: "Company C", type: "TRANSPORTATION_COMPANY", deletedAt: "2023-06-03" },
    { id: 4, name: "Company D", type: "AGRICULTURE_SHOPS", deletedAt: "2023-06-04" },
  ]
}

function RecycleBin() {
  const [deletedItems, setDeletedItems] = useState([])
  const [filterType, setFilterType] = useState("")

  useEffect(() => {
    const loadDeletedItems = async () => {
      const data = await fetchDeletedItems()
      setDeletedItems(data)
    }
    loadDeletedItems()
  }, [])

  const handleRestore = (id) => {
    // In a real application, this would be an API call
    setDeletedItems(deletedItems.filter((item) => item.id !== id))
    alert(`Item ${id} restored`)
  }

  const handleDelete = (id) => {
    // In a real application, this would be an API call
    setDeletedItems(deletedItems.filter((item) => item.id !== id))
    alert(`Item ${id} permanently deleted`)
  }

  const filteredItems = deletedItems.filter((item) => (filterType ? item.type === filterType : true))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recycle Bin</h1>
      <div className="mb-4">
        <select className="p-2 border rounded" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="STUBBLE_PURCHASING_COMPANY">Stubble Purchasing</option>
          <option value="MACHINE_RENTAL">Machine Rental</option>
          <option value="TRANSPORTATION_COMPANY">Transportation</option>
          <option value="AGRICULTURE_SHOPS">Agriculture Shops</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Deleted At</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.type.replace(/_/g, " ")}</td>
              <td className="p-2">{item.deletedAt}</td>
              <td className="p-2">
                <button onClick={() => handleRestore(item.id)} className="mr-2 text-blue-500">
                  <RefreshCw className="inline-block mr-1" /> Restore
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500">
                  <Trash2 className="inline-block mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecycleBin

