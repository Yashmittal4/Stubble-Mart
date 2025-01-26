const express = require("express")
const statsController = require("../controllers/statsController")

const router = express.Router()

router.get("/monthly", statsController.getMonthlyStats)
router.get("/collaboration-types", statsController.getCollaborationTypes)
router.get("/crop-distribution", statsController.getCropDistribution)
router.get("/farmer-status-distribution", statsController.getFarmerStatusDistribution)
router.get("/product-price-distribution", statsController.getProductPriceDistribution)
router.get("/top-selling-products", statsController.getTopSellingProducts)

module.exports = router

