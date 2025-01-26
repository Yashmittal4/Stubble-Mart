const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  image: { type: String, required: true },
})

module.exports = mongoose.model("Product", ProductSchema)

