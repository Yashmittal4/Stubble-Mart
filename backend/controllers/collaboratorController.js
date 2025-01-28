const Collaborator = require("../models/Collaborator")

exports.submitCollaborator = async (req, res) => {
  try {
    const collaborator = new Collaborator(req.body)
    await collaborator.save()
    res.status(201).json({ message: "Collaborator information submitted successfully" })
  } catch (error) {
    console.error("Error submitting collaborator information:", error)
    res.status(500).json({ message: "Error submitting collaborator information" })
  }
}

exports.getCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.find()
    res.json(collaborators)
  } catch (error) {
    console.error("Error fetching collaborators:", error)
    res.status(500).json({ message: "Error fetching collaborators" })
  }
}

exports.updateCollaborator = async (req, res) => {
  try {
    const updatedCollaborator = await Collaborator.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedCollaborator)
  } catch (error) {
    console.error("Error updating collaborator:", error)
    res.status(500).json({ message: "Error updating collaborator" })
  }
}

exports.deleteCollaborator = async (req, res) => {
  try {
    await Collaborator.findByIdAndDelete(req.params.id)
    res.json({ message: "Collaborator deleted successfully" })
  } catch (error) {
    console.error("Error deleting collaborator:", error)
    res.status(500).json({ message: "Error deleting collaborator" })
  }
}


