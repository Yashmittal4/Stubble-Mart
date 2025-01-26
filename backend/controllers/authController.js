const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { generateOTP } = require("../utils/otp")
const { sendOTP } = require("../utils/email")

const otpCache = {}

exports.signup = async (req, res) => {
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
}

exports.verifyOTP = async (req, res) => {
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

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
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
}

exports.login = async (req, res) => {
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

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

