import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()


const app = express()


app.get('/', (req, res) => {
  res.send('kavidu!')
})

mongoose.connect(process.env.MONGODB_URL).then(() => {
       console.log('Connected to MongoDB')
})
  

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
