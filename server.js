import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

dotenv.config()


const app = express()


app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('kavidu!')
})


mongoose.connect(process.env.MONGODB_URL).then(() => {
       console.log('Connected to MongoDB')
})
  

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
