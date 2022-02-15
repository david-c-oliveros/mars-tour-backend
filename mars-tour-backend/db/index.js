const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://127.0.0.1:27017/mars'

mongoose.connect(MONGO_URI, () => {
    console.log('connected to MongoDB')
})
