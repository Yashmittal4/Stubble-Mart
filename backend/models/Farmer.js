const mongoose = require("mongoose")

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  crops: [
    {
      cropName: String,
      landSize: String,
      services: [String],
    },
  ],
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
})

module.exports = mongoose.model("Farmer", FarmerSchema)

