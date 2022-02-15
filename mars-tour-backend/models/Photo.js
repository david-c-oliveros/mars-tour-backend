const mongoose = require('mongoose')

const photoSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },

    sol: Number,

    camera: {
        type: {
            id: Number,
            name: String,
            rover_id: Number,
            full_name: String
        }
    },

    img_src: String,
    earth_date: String,
    rover: {
        type: {
            id: Number,
            name: String,
            landing_date: String,
            launch_date: String,
            status: String
        }
    }

}, { timestamps: true })

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
