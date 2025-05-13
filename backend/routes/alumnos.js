var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var alumnos = require('../models/alumnos')
mongoose.set('strict', false)


// GET all alumnos
router.get('/', async (req, res) => {
    try {
        const alumnos = await alumnos.find()
        res.status(200).json(alumnos)
    } catch (err) {
        res.status(500).send('Error retrieving alumnos')
    }
})

// GET a single alumno by ID
router.get('/:correo', function (req, res) {
    var correo = req.params.correo
    alumnos.findOne({ correo: correo }, function (err, alumno) {
        if (err) {
            res.status(500).send('Error retrieving alumno')
        } else {
            res.status(200).json(alumno)
        }
    })
})
