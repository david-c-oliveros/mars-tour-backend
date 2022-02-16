const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mars'

mongoose.connect(MONGO_URI, () => {
    console.log('connected to MongoDB')
})

mongoose.connection.on('error', err => {
    console.log(err.message, 'is MongoDB running?')
})
