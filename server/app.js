const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')

const port = process.env.PORT
const connectDB = require('./config/db')

const router = require('./routes/')

// Middleware to parse JSON body in requests
app.use(express.json())

// Middleware to parse cookies from requests
app.use(cookieParser())
// Middleware to parse form data from requests
app.use(express.urlencoded({ extended: true }))


// http://localhost:3000/api
app.use('/api',router)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Connect to Database

 connectDB();


 

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`)
})
