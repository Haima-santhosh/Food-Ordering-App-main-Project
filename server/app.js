
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------
// MIDDLEWARES
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  "http://localhost:5174",
  "https://food-ordering-app-main-project-client.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // crucial for cookies
}));

// Handle preflight requests for PATCH, DELETE, etc.
// Apply CORS preflight handling for all routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// -----------------------------
// DATABASE CONNECTION
// -----------------------------
connectDB();

// -----------------------------
// API ROUTES
// -----------------------------
app.use('/api', router);

// -----------------------------
// DEFAULT ROOT MESSAGE
// -----------------------------
app.get("/", (req, res) => {
  res.send("Food App API is running...");
});

// -----------------------------
// ERROR HANDLING
// -----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// -----------------------------
// START SERVER
// -----------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
