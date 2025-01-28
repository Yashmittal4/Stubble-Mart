import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import l1 from "../../assets/svg/newlogo.svg"
import l2 from "../../assets/svg/banner4 1.svg"


const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z]+$/, "Name must contain only alphabets"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .regex(/^[a-zA-Z0-9\s#,-]+$/, "Address can only contain letters, numbers, spaces, #, -, and ,"),
  role: z.enum(["FARMER", "COLLABORATOR"]),
})

export default function SignupPage() {
  const navigate = useNavigate()
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "FARMER",
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", data)
      console.log("Registration initiated:", response.data)
      setEmail(data.email)
      setShowOtpInput(true)
    } catch (error) {
      console.error("Registration error:", error.response.data)
      if (error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.param, { type: "manual", message: err.msg })
        })
      } else {
        setError("email", { type: "manual", message: error.response.data.message })
      }
    }
  }

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp })
      console.log("OTP verification successful:", response.data)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/login")
    } catch (error) {
      console.error("OTP verification error:", error.response.data)
      setError("otp", { type: "manual", message: error.response.data.message })
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-raleway">
      <motion.div
        className="md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center order-2 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-8 text-green-700">Sign Up</h2>
          {!showOtpInput ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                    className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
                               focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                               ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
                               focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                               ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                             ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                             ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                             ${errors.address ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm
                             focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                             ${errors.role ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="FARMER">Farmer</option>
                  <option value="COLLABORATOR">Collaborator</option>
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2 rounded-md"
              >
                <Mail className="w-5 h-5" />
                Sign Up with Email
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                             focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="Enter OTP"
                />
              </div>
              <button
                onClick={verifyOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2 rounded-md"
              >
                Verify OTP
              </button>
            </div>
          )}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 hover:underline font-semibold">
                Log in
              </a>
            </p>
          </div>
          <p className="mt-4 text-xs text-center text-gray-500">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-green-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-green-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </motion.div>
      <motion.div
        className="md:w-1/2 p-8 text-white relative overflow-hidden order-1 md:order-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="absolute inset-0  bg-cover bg-center"
          style={{
            backgroundImage: `url(${l2})`,
            filter: "brightness(90%)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/80"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="relative z-20  flex flex-col justify-between">
          <img src={l1 || "/placeholder.svg"} alt="Stubble Mart Logo" className=" h-72" />
          <div>
            <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Create New Account</h1>
            <p className="mb-8 text-xl text-green-100 drop-shadow">
              Join Stubble Mart today and revolutionize your farming experience with our cutting-edge solutions.
            </p>
          </div>
          <div className="text-sm text-green-100 mt-8 drop-shadow">
            © {new Date().getFullYear()} Stubble Mart. All rights reserved.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

