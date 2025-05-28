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
router.get('/correo/:correo', function (req, res) {
    var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
    profesores.findOne({ correo: correo }, function (err, profesor) {
        if (err) {
            res.status(500).send('Error retrieving alumno')
        }else {
            res.status(200).json(profesor)
        }
    })
})

// actualizar profresor
router.patch('/guardarprogreso/:correo', async (req, res) => {
    try {
        var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
        const { mundos, puntosTotales, estrellasTotales, insignias,biblioteca,avatar } = req.body
        const update= {}
        if (biblioteca) update.biblioteca = biblioteca
        if (avatar) update.avatar = avatar
        if (insignias) update.insignias = insignias
        if (mundos) update.mundos = mundos
        if (puntosTotales && typeof puntosTotales === 'number') update.puntosTotales = puntosTotales
        if (estrellasTotales && typeof estrellasTotales === 'number') update.estrellasTotales = estrellasTotales
        console.log(correo, update)
        const updatedProfesor = await profesores.findOneAndUpdate(
            { correo: correo },
            { $set: update },
            { new: true }
        )

        if (!updatedProfesor)
            return res.status(404).send('Alumno not found')
        else res.status(200).json(updatedProfesor)

    } catch (err) {
        res.status(500).send('Error updating niveles')
    }
})

module.exports = router