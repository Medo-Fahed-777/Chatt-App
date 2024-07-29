import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './db/connectDb.js'
import { app, server } from './socket/socket.js'
// Routes // --------------------------------
import autRoutes from './routes/authRoutes.js'
import msgRoutes from './routes/msgRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(cookieParser())
app.use('/api/auth',autRoutes)
app.use('/api/msgs',msgRoutes)
app.use('/api/users',userRoutes)


server.listen(PORT , () => {
  connectDB(),
  console.log('Data Base Name :' ,process.env.DATABASE_URL );
console.log(`Server Is running on Port : ${PORT}`)
})