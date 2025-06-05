import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


import routes from './route/index.js'
import passportJwtStrategy from './config/passportJwtStragetgy.js'
import connectDb from './config/db.js'

const app = express()
dotenv.config()
connectDb()

// CORS configuration
// const corsOptions = {
//   origin: ['http://localhost:5173'],
//   optionSuccessStatus: 200 // Replace with your frontend URL
// }

const corsOptions = {
  origin: ['http://localhost:5173', "https://my-video-hub-backend-api-eta.vercel.app"], // Make sure this matches your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(passportJwtStrategy.initialize()) 



const port = process.env.PORT || 8000

app.get('/', (req, res) => res.send('Hello world.'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1', routes)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})