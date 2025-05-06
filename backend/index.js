import express from 'express'
import connectDb from './config/db.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
connectDb()

const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})