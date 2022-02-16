const mongoose = require('mongoose')

const cameraSchema = mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    rover_id: { type: Number },
    full_name: { type: String }
})

const roverSchema = mongoose.Schema({
    id:           { type: Number },
    name:         { type: String },
    landing_date: { type: String },
    launch_date:  { type: String },
    status:       { type: String }
})

const photoSchema = mongoose.Schema({
    id:         { type: Number, required: true, unique: true },
    sol:        { type: Number },
    camera:     { type: cameraSchema },
    img_src:    { type: String },
    earth_date: { type: String },
    rover:      { type: roverSchema }
}, { timestamps: true })

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
