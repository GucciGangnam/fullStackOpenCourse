const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// Utils
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
// Routers
const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

    // Pre custom middleware
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(express.urlencoded({ extended: true }));


app.get('/api', (req, res) => { 
    res.send("Wecome to thr API home")
});

// Router middleware
app.use('/api/blogs', blogRouter)




// Error middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app