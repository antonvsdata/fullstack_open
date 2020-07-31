const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
// Routers
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
//Middleware
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
require('dotenv').config()

// Connection to database
logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Routers
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

// Error handler middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
