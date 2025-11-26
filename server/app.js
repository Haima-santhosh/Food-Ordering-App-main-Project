const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS for Render + Local development
app.use(
  cors({
    origin: [
      process.env.VITE_CLIENT_URL || "http://localhost:5173",
    ],
    credentials: true, // important for sending cookies
  })
);

// Optional headers fix for cookies
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => res.send("Backend working!"));

// Connect DB and start server
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
