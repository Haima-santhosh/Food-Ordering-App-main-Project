const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/');

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -------------------------
// CORS for Render + Local
// -------------------------
app.use(
  cors({
    origin: [
      "https://food-ordering-app-main-project-client.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true, // required for cookies
  })
);

// FIX: Important headers for cookies (Render)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.use('/api', router);

// Test Route
app.get('/', (req, res) => {
  res.send("Backend working!");
});

// Connect DB and start server
connectDB();
app.listen(port, () => console.log(`Server running on port ${port}`));
