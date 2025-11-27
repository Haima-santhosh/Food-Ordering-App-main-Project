const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define allowed frontend URLs
const allowedOrigins = [
  "https://food-ordering-app-main-project-client.onrender.com",
  "http://localhost:5173" // for local development
];

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// DATABASE CONNECTION
connectDB();

// API ROUTES
app.use('/api', router);

// DEFAULT ROOT
app.get("/", (req, res) => res.send("Food App API is running..."));

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// START SERVER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
