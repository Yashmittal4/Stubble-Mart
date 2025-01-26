require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/database")

const authRoutes = require("./routes/auth")
const collaboratorRoutes = require("./routes/collaborators")
const farmerRoutes = require("./routes/farmers")
const productRoutes = require("./routes/products")
const statsRoutes = require("./routes/stats")

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/collaborators", collaboratorRoutes)
app.use("/api/farmers", farmerRoutes)
app.use("/api/products", productRoutes)
app.use("/api/stats", statsRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

