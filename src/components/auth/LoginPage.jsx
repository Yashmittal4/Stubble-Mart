import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import l1 from "../../assets/svg/newlogo.svg"
import l2 from "../../assets/svg/banner4 1.svg"

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (method) => {
    try {
      console.log("Login attempt with:", method, credentials)
      // Implement your login logic here
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-raleway">
      <LoginPageLeft />
      <LoginPageRight credentials={credentials} handleInputChange={handleInputChange} handleLogin={handleLogin} />
    </div>
  )
}

const LoginPageLeft = () => (
  <motion.div
    className="md:w-1/2 p-8 text-white relative overflow-hidden"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0  bg-cover bg-center"style={{
          backgroundImage: `url(${l2})`,
          filter: "brightness(90%)"
        }}></div>
    <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/80"></div>
    <div className="absolute inset-0 backdrop-blur-[2px]"></div>
    <div className="relative z-20  flex flex-col justify-between">
      <img src={l1} alt="Stubble Mart Logo" className="mb-2 h-72" />
      <div>
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Welcome Back</h1>
        <p className="mb-8 text-xl text-green-100 drop-shadow">
          Log in to access your Stubble Mart account and start managing your agricultural needs.
        </p>
      </div>
      <div className="text-sm text-green-100 mt-8 drop-shadow">
        © {new Date().getFullYear()} Stubble Mart. All rights reserved.
      </div>
    </div>
  </motion.div>
)

const LoginPageRight = ({ credentials, handleInputChange, handleLogin }) => (
  <motion.div
    className="md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-8 text-green-700">Login</h2>

      <button
        onClick={() => handleLogin("google")}
        className="w-full mb-4 h-12 text-lg flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Continue with Google
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin("credentials")
        }}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2 rounded-md"
        >
          <Mail className="w-5 h-5" />
          Login with Email
        </button>
      </form>

      <div className="mt-6 text-center space-y-4">
        <div className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline font-semibold">
            Register here
          </a>
        </div>
      </div>
    </div>
  </motion.div>
)

export default LoginPage

