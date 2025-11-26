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
// CORS (Render Frontend + Local Dev)
// -------------------------
const allowedOrigins = [
  "https://food-ordering-app-main-project-client.onrender.com",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


// Routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => res.send('Backend working!'));

// Connect DB & start server
connectDB();
app.listen(port, () => console.log(`Server running on port ${port}`));
