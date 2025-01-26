const express = require("express")
const { body } = require("express-validator")
const authController = require("../controllers/authController")

const router = express.Router()

const validateSignup = [
  body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("phoneNumber").isLength({ min: 10 }).withMessage("Phone number must be at least 10 digits"),
  body("address").isLength({ min: 5 }).withMessage("Address must be at least 5 characters"),
  body("role").isIn(["FARMER", "COLLABORATOR"]).withMessage("Invalid role"),
]

router.post("/signup", validateSignup, authController.signup)
router.post("/verify-otp", authController.verifyOTP)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password is required"),
  ],
  authController.login,
)

module.exports = router

