// app.js
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');
const router = require('./routes/');

const port = process.env.PORT || 5000;

// -------- MIDDLEWARES --------

// Parse cookies
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  "http://localhost:5173", // dev frontend
  "https://grabbite-food-ordering-app.vercel.app", // production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy does not allow access from: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow cookies
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

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Session setup (for auth)
app.use(session({
  name: 'grabbite_sid',
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS required in prod
    httpOnly: true,
    sameSite: 'none', // cross-site cookie (Vercel frontend → Render backend)
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// -------- ROUTES --------
app.use('/api', router);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// -------- DATABASE --------
connectDB();

// -------- SERVER --------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
