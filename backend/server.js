import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import adRoutes from './routes/adRoutes.js'
import {errorHandler , notFound} from './middleware/errorHandler.js'
import path from 'path';
import uploadRoute from './routes/uploadRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.use(express.json())




app.use('/api/post', adRoutes )
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoute)

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
