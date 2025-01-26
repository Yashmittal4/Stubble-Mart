const Farmer = require("../models/Farmer")

exports.submitFarmer = async (req, res) => {
  try {
    const farmer = new Farmer(req.body)
    await farmer.save()
    res.status(201).json({ message: "Farmer information submitted successfully" })
  } catch (error) {
    console.error("Error submitting farmer information:", error)
    res.status(500).json({ message: "Error submitting farmer information" })
  }
}

exports.getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find()
    res.json(farmers)
  } catch (error) {
    console.error("Error fetching farmers:", error)
    res.status(500).json({ message: "Error fetching farmers" })
  }
}

exports.updateFarmer = async (req, res) => {
  try {
    const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedFarmer)
  } catch (error) {
    console.error("Error updating farmer:", error)
    res.status(500).json({ message: "Error updating farmer" })
  }
}

exports.deleteFarmer = async (req, res) => {
  try {
    await Farmer.findByIdAndDelete(req.params.id)
    res.json({ message: "Farmer deleted successfully" })
  } catch (error) {
    console.error("Error deleting farmer:", error)
    res.status(500).json({ message: "Error deleting farmer" })
  }
}

