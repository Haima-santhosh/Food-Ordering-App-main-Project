const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT
const connectDB = require('./config/db')

const router = require('./routes/')


app.use(express.json())

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
