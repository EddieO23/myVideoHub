import express from 'express'
import dotenv from 'dotenv'


import routes from './route/index.js'
import passportJwtStrategy from './config/passportJwtStragetgy.js'
import connectDb from './config/db.js'

const app = express()
dotenv.config()
connectDb()

app.use(passportJwtStrategy.initialize())

const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1', routes)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})