import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import FounderRoute from "./routes/FounderRoute.js"
import FeatureRoute from "./routes/FeatureRoute.js"
import DashboardRoute from "./routes/DashboardRoute.js"


const app = express()
const PORT = process.env.PORT || 5000

await connectDB()

// Middleware to parse JSON bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // For parsing URL-encoded data

// cors middleware
app.use(cors({
  origin: process.env.VITE_BASE_URL, // Adjust this to your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello, World!")
})
// Routes
app.use("/api/founder", FounderRoute)
app.use("/api/features", FeatureRoute)
app.use("/api/dashboard", DashboardRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
