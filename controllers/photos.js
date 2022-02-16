const express = require('express')

const router = express.Router()

const Photo = require('../models/Photo')


/****************************/
/*        Show Route        */
/****************************/
router.get('/:id', async (req, res) => {
    try {
        const onePhoto = await Photo.findOne({ id: req.params.id })
        res.json(onePhoto)
    } catch(err) {
        res.send('Error: ' + err)
    }
})


/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', async (req, res) => {
    try {
        const allPhotos = await Photo.find({})
        res.json(allPhotos)
    } catch(err) {
        res.send('Error: ' + err)
    }
})


/****************************/
/*        Post Route        */
/****************************/
router.post('/', async (req, res) => {
    try {
        const newPhotos = await Photo.insertMany(req.body)
        res.json(newPhotos)
    } catch (err) {
        res.send('Error: ' + err)
    }
})


/******************************/
/*        Delete Route        */
/******************************/
router.delete('/:id', (req, res) => {
    res.send('hitting delete route')
})


/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => {
    res.send('hitting update route')
})


module.exports = router
