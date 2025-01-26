const Collaborator = require("../models/Collaborator")
const Farmer = require("../models/Farmer")
const Product = require("../models/Product")

exports.getMonthlyStats = async (req, res) => {
  try {
    const monthlyStats = await Promise.all([
      Collaborator.countDocuments(),
      Farmer.countDocuments(),
      Product.countDocuments(),
    ])

    const stats = [
      { month: "Current", collaborators: monthlyStats[0], farmers: monthlyStats[1], products: monthlyStats[2] },
    ]

    res.json(stats)
  } catch (error) {
    console.error("Error fetching monthly stats:", error)
    res.status(500).json({ message: "Error fetching monthly stats" })
  }
}

exports.getCollaborationTypes = async (req, res) => {
  try {
    const collaborationTypes = await Collaborator.aggregate([
      { $group: { _id: "$collaborationType", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(collaborationTypes)
  } catch (error) {
    console.error("Error fetching collaboration types:", error)
    res.status(500).json({ message: "Error fetching collaboration types" })
  }
}

exports.getCropDistribution = async (req, res) => {
  try {
    const cropDistribution = await Farmer.aggregate([
      { $unwind: "$crops" },
      { $group: { _id: "$crops.cropName", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(cropDistribution)
  } catch (error) {
    console.error("Error fetching crop distribution:", error)
    res.status(500).json({ message: "Error fetching crop distribution" })
  }
}

exports.getFarmerStatusDistribution = async (req, res) => {
  try {
    const farmerStatusDistribution = await Farmer.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(farmerStatusDistribution)
  } catch (error) {
    console.error("Error fetching farmer status distribution:", error)
    res.status(500).json({ message: "Error fetching farmer status distribution" })
  }
}

exports.getProductPriceDistribution = async (req, res) => {
  try {
    const productPriceDistribution = await Product.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ["$maxPrice", 1000] }, then: "0-1000" },
                { case: { $lte: ["$maxPrice", 2000] }, then: "1001-2000" },
                { case: { $lte: ["$maxPrice", 3000] }, then: "2001-3000" },
                { case: { $lte: ["$maxPrice", 4000] }, then: "3001-4000" },
              ],
              default: "4001+",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(productPriceDistribution)
  } catch (error) {
    console.error("Error fetching product price distribution:", error)
    res.status(500).json({ message: "Error fetching product price distribution" })
  }
}

exports.getTopSellingProducts = async (req, res) => {
  try {
    const topSellingProducts = await Product.aggregate([
      { $sample: { size: 5 } },
      { $project: { name: "$name", value: { $floor: { $multiply: [{ $rand: {} }, 100] } } } },
    ])
    res.json(topSellingProducts)
  } catch (error) {
    console.error("Error fetching top selling products:", error)
    res.status(500).json({ message: "Error fetching top selling products" })
  }
}

