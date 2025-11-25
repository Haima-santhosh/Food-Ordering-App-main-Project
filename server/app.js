const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');
const router = require('./routes/');

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS for local frontend
app.use(cors({
  origin: ["http://localhost:5173"], // Vite dev server
  credentials: true
}));

// Session for auth
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, sameSite: 'lax' }
}));

// Routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => res.send('Backend working!'));

// Connect DB & start server
connectDB();
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
