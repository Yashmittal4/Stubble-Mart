const Product = require("../models/Product")

exports.addProduct = async (req, res) => {
  try {
    const { name, description, minPrice, maxPrice } = req.body
    const image = req.file.path
    const product = new Product({ name, description, minPrice, maxPrice, image })
    await product.save()
    res.status(201).json({ message: "Product added successfully" })
  } catch (error) {
    console.error("Error adding product:", error)
    res.status(500).json({ message: "Error adding product" })
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Error fetching products" })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, minPrice, maxPrice } = req.body
    const image = req.file ? req.file.path : req.body.image
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, minPrice, maxPrice, image },
      { new: true },
    )
    res.json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    res.status(500).json({ message: "Error updating product" })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    res.status(500).json({ message: "Error deleting product" })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({ message: "Error fetching product" })
  }
}

