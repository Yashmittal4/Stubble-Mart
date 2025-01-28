const express = require("express")
const collaboratorController = require("../controllers/collaboratorController")

const router = express.Router()

router.post("/", collaboratorController.submitCollaborator)
router.get("/", collaboratorController.getCollaborators)
router.put("/:id", collaboratorController.updateCollaborator)
router.delete("/:id", collaboratorController.deleteCollaborator)

module.exports = router


