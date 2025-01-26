const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const { body, validationResult } = require("express-validator")
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = "your_jwt_secret"
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))

mongoose
  .connect("mongodb://127.0.0.1:27017/stubble", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// User Schema and Model (unchanged)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["FARMER", "COLLABORATOR"], required: true },
  isVerified: { type: Boolean, default: false },
})

const User = mongoose.model("User", UserSchema)

// Collaborator Schema and Model
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

const Collaborator = mongoose.model("Collaborator", CollaboratorSchema)

// Farmer Schema and Model
const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  crops: [
    {
      cropName: String,
      landSize: String,
      services: [String], // Add this line to include services
    },
  ],
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
})

const Farmer = mongoose.model("Farmer", FarmerSchema)

// Product Schema and Model (updated to include price range)
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  image: { type: String, required: true },
})

const Product = mongoose.model("Product", ProductSchema)

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

// Validation middleware
const validateSignup = [
  body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("phoneNumber").isLength({ min: 10 }).withMessage("Phone number must be at least 10 digits"),
  body("address").isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
  body("role").isIn(["FARMER", "COLLABORATOR"]).withMessage("Invalid role"),
]

const otpCache = {}

function generateOTP() {
  return randomstring.generate({ length: 4, charset: "numeric" })
}

function sendOTP(email, otp) {
  const mailOptions = {
    from: "chomalmedha@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "chomalmedha@gmail.com",
      pass: "sebl epvb gzeg xako",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error)
    } else {
      console.log("OTP Email sent successfully:", info.response)
    }
  })
}

// Authentication routes
app.post("/api/signup", validateSignup, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password, phoneNumber, address, role } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    })

    await user.save()

    const otp = generateOTP()
    otpCache[email] = otp
    sendOTP(email, otp)

    res.json({ message: "User registered. Please verify your email." })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body

  if (!otpCache.hasOwnProperty(email)) {
    return res.status(400).json({ message: "Email not found or OTP expired" })
  }

  if (otpCache[email] === otp.trim()) {
    delete otpCache[email]

    try {
      const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      }

      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" })
  }
})

app.post(
  "/api/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      if (!user.isVerified) {
        const otp = generateOTP()
        otpCache[email] = otp
        sendOTP(email, otp)
        return res.status(403).json({ message: "Email not verified. New OTP sent." })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      }

      jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err) throw err
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
    }
  },
)

// Collaborator routes
app.post("/api/submit-collaborator", async (req, res) => {
  try {
    const collaborator = new Collaborator(req.body)
    await collaborator.save()
    res.status(201).json({ message: "Collaborator information submitted successfully" })
  } catch (error) {
    console.error("Error submitting collaborator information:", error)
    res.status(500).json({ message: "Error submitting collaborator information" })
  }
})

app.get("/api/collaborators", async (req, res) => {
  try {
    const collaborators = await Collaborator.find()
    res.json(collaborators)
  } catch (error) {
    console.error("Error fetching collaborators:", error)
    res.status(500).json({ message: "Error fetching collaborators" })
  }
})

app.put("/api/collaborators/:id", async (req, res) => {
  try {
    const updatedCollaborator = await Collaborator.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedCollaborator)
  } catch (error) {
    console.error("Error updating collaborator:", error)
    res.status(500).json({ message: "Error updating collaborator" })
  }
})

app.delete("/api/collaborators/:id", async (req, res) => {
  try {
    await Collaborator.findByIdAndDelete(req.params.id)
    res.json({ message: "Collaborator deleted successfully" })
  } catch (error) {
    console.error("Error deleting collaborator:", error)
    res.status(500).json({ message: "Error deleting collaborator" })
  }
})

// Farmer routes
app.post("/api/farmers", async (req, res) => {
  try {
    const farmer = new Farmer(req.body)
    await farmer.save()
    res.status(201).json({ message: "Farmer information submitted successfully" })
  } catch (error) {
    console.error("Error submitting farmer information:", error)
    res.status(500).json({ message: "Error submitting farmer information" })
  }
})

app.get("/api/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find()
    res.json(farmers)
  } catch (error) {
    console.error("Error fetching farmers:", error)
    res.status(500).json({ message: "Error fetching farmers" })
  }
})

app.put("/api/farmers/:id", async (req, res) => {
  try {
    const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedFarmer)
  } catch (error) {
    console.error("Error updating farmer:", error)
    res.status(500).json({ message: "Error updating farmer" })
  }
})

app.delete("/api/farmers/:id", async (req, res) => {
  try {
    await Farmer.findByIdAndDelete(req.params.id)
    res.json({ message: "Farmer deleted successfully" })
  } catch (error) {
    console.error("Error deleting farmer:", error)
    res.status(500).json({ message: "Error deleting farmer" })
  }
})

// Product routes (updated to handle price range)
app.post("/api/products", upload.single("image"), async (req, res) => {
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
})

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ message: "Error fetching products" })
  }
})

app.put("/api/products/:id", upload.single("image"), async (req, res) => {
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
})

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    res.status(500).json({ message: "Error deleting product" })
  }
})

// New routes for statistics
app.get("/api/stats/monthly", async (req, res) => {
  try {
    const monthlyStats = await Promise.all([
      Collaborator.countDocuments(),
      Farmer.countDocuments(),
      Product.countDocuments(),
    ])

    const stats = [
      { month: "Current", collaborators: monthlyStats[0], farmers: monthlyStats[1], products: monthlyStats[2] },
    ]

    res.json(stats)
  } catch (error) {
    console.error("Error fetching monthly stats:", error)
    res.status(500).json({ message: "Error fetching monthly stats" })
  }
})

app.get("/api/stats/collaboration-types", async (req, res) => {
  try {
    const collaborationTypes = await Collaborator.aggregate([
      { $group: { _id: "$collaborationType", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(collaborationTypes)
  } catch (error) {
    console.error("Error fetching collaboration types:", error)
    res.status(500).json({ message: "Error fetching collaboration types" })
  }
})

app.get("/api/stats/crop-distribution", async (req, res) => {
  try {
    const cropDistribution = await Farmer.aggregate([
      { $unwind: "$crops" },
      { $group: { _id: "$crops.cropName", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(cropDistribution)
  } catch (error) {
    console.error("Error fetching crop distribution:", error)
    res.status(500).json({ message: "Error fetching crop distribution" })
  }
})

app.get("/api/stats/farmer-status-distribution", async (req, res) => {
  try {
    const farmerStatusDistribution = await Farmer.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(farmerStatusDistribution)
  } catch (error) {
    console.error("Error fetching farmer status distribution:", error)
    res.status(500).json({ message: "Error fetching farmer status distribution" })
  }
})

app.get("/api/stats/product-price-distribution", async (req, res) => {
  try {
    const productPriceDistribution = await Product.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ["$maxPrice", 1000] }, then: "0-1000" },
                { case: { $lte: ["$maxPrice", 2000] }, then: "1001-2000" },
                { case: { $lte: ["$maxPrice", 3000] }, then: "2001-3000" },
                { case: { $lte: ["$maxPrice", 4000] }, then: "3001-4000" },
              ],
              default: "4001+",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $project: { name: "$_id", value: "$count" } },
    ])
    res.json(productPriceDistribution)
  } catch (error) {
    console.error("Error fetching product price distribution:", error)
    res.status(500).json({ message: "Error fetching product price distribution" })
  }
})

app.get("/api/stats/top-selling-products", async (req, res) => {
  try {
    const topSellingProducts = await Product.aggregate([
      { $sample: { size: 5 } },
      { $project: { name: "$name", value: { $floor: { $multiply: [{ $rand: {} }, 100] } } } },
    ])
    res.json(topSellingProducts)
  } catch (error) {
    console.error("Error fetching top selling products:", error)
    res.status(500).json({ message: "Error fetching top selling products" })
  }
})
app.get("/api/products/:id", async (req, res) => {
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
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

