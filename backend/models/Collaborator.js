const mongoose = require("mongoose")

const CollaboratorSchema = new mongoose.Schema({
  collaborationType: { type: String, required: true },
  companyName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyDescription: { type: String },
  query: { type: String },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  crops: [
    {
      cropName: String,
      priceRangeFrom: Number,
      priceRangeTo: Number,
    },
  ],
})

module.exports = mongoose.model("Collaborator", CollaboratorSchema)

