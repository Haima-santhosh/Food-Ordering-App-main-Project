const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const router = require('./routes/');

// Parse cookies
app.use(cookieParser());

// -------- CORS Setup --------
// Allowed origins (local dev + Vercel frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://grabbite-food-ordering-app.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,          // allow cookies
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookies",
    "X-Requested-With",
    "Accept"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));

// Parse JSON
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect DB
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
