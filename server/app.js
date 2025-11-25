const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const port = process.env.PORT
const connectDB = require('./config/db')

const router = require('./routes/')


// Parse cookies
app.use(cookieParser())

// -------- CORS FIX --------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://grabbite-food-ordering-app.vercel.app"
    ],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookies",
      "X-Requested-With",
      "Accept"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ---------------------------

// Parse JSON
app.use(express.json())



// Parse form data
app.use(express.urlencoded({ extended: true }))

// All API routes use /api prefix
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Connect to database
connectDB()

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`)
})
