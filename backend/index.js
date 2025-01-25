const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const { body, validationResult } = require("express-validator")
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = "your_jwt_secret" 

app.use(cors())
app.use(express.json())
app.use(cookieParser())

mongoose
  .connect("mongodb://127.0.0.1:27017/stubble", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

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

const CollaboratorSchema = new mongoose.Schema({
  collaborationType: { type: String, required: true },
  companyName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyDescription: { type: String },
  query: { type: String },
  crops: [{
    cropName: String,
    priceRangeFrom: Number,
    priceRangeTo: Number
  }]
})

const Collaborator = mongoose.model("Collaborator", CollaboratorSchema)

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


