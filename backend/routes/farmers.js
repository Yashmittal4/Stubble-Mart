const express = require("express")
const farmerController = require("../controllers/farmerController")

const router = express.Router()

router.post("/", farmerController.submitFarmer)
router.get("/", farmerController.getFarmers)
router.put("/:id", farmerController.updateFarmer)
router.delete("/:id", farmerController.deleteFarmer)

module.exports = router

