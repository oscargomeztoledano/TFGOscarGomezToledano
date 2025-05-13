var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var profesores = require('../models/profesores')
mongoose.set('strict', false)


// GET all profesores
router.get('/', async (req, res) => {
    try {
        const profesores = await profesores.find()
        res.status(200).json(profesores)
    } catch (err) {
        res.status(500).send('Error retrieving profesores')
    }
})

// GET a single profesor by ID
router.get('/:id', function (req, res) {
    var id = req.params.id
    profesores.findOne({ _id: mongoose.Types.ObjectId(id) }, function (err, profesor) {
        if (err) {
            res.status(500).send('Error retrieving profesor')
        } else {
            res.status(200).json(profesor)
        }
    })

})