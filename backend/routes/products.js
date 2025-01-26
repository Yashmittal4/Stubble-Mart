const express = require("express")
const productController = require("../controllers/productController")
const upload = require("../middleware/upload")

const router = express.Router()

router.post("/", upload.single("image"), productController.addProduct)
router.get("/", productController.getProducts)
router.put("/:id", upload.single("image"), productController.updateProduct)
router.delete("/:id", productController.deleteProduct)
router.get("/:id", productController.getProductById)

module.exports = router

