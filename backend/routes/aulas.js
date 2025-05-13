var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var aulas = require('../models/aulas')
mongoose.set('strict', false)


// GET all aulas
router.get('/', async (req, res) => {
    try {
        const aulas = await aulas.find()
        res.status(200).json(aulas)
    } catch (err) {
        res.status(500).send('Error retrieving aulas')
    }
})

// GET a single aulas by ID
router.get('/:id', function (req, res) {
    var id = req.params.id
    aulas.findOne({ _id: mongoose.Types.ObjectId(id) }, function (err, aulas) {
        if (err) {
            res.status(500).send('Error retrieving aulas')
        } else {
            res.status(200).json(aulas)
        }
    })

})