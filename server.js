import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

import authRouter from './src/Routes/authRouter.js'

dotenv.config()




const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('kavidu!')
})

app.use('/api/v1/auth', authRouter)


mongoose.connect(process.env.MONGODB_URL).then(() => {
       console.log('Connected to MongoDB')
})
  

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
