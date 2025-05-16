var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var alumnos = require('../models/alumnos')
var aulas = require('../models/aulas')
mongoose.set('strict', false)
const { defaultMundos } = require('../utils/default')

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
    var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
    alumnos.findOne({ correo: correo }, function (err, alumno) {
        if (err) {
            res.status(500).send('Error retrieving alumno')
        } else if(!alumno) {
            res.status(404).send('Alumno not found')
        }else {
            res.status(200).json(alumno)
        }
    })
})

// POST a new alumno
router.post('/', async (req, res)=> {
    try{
        const { nombre, correo, password, aula } = req.body
        const existingAlumno = await alumnos.findOne({ correo: correo })
        const existingAula = await aulas.findOne({ codigo: aula })
        if (existingAlumno) {
            return res.status(400).send('Alumno already exists')
        } else if (!existingAula) {
            return res.status(404).send('Aula does not exist')
        }
        else {
            const newAlumno = new alumnos({
                nombre,
                correo,
                password,
                aula,
                mundos: defaultMundos(),
            })
            await newAlumno.save()
            res.status(201).json(newAlumno)
        }
    }catch(err){
        res.status(500).send('Error creating alumno')
    }

})

// PUT update avatar by correo
router.put('/updateAvatar/:correo', async (req, res) => {
    try {
        var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
        const { avatar } = req.body

        const updatedAlumno = await alumnos.findOneAndUpdate(
            { correo: correo },
            { avatar: avatar },
            { new: true }
        )

        if (!updatedAlumno)
            return res.status(404).send('Alumno not found')
        else res.status(200).json(updatedAlumno)

    } catch (err) {
        res.status(500).send('Error updating avatar')
    }
})


router.put('/updateNiveles/:correo', async (req, res) => {
    try {
        var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
        const { mundos } = req.body

        const updatedAlumno = await alumnos.findOneAndUpdate(
            { correo: correo },
            { mundos: mundos },
            { new: true }
        )

        if (!updatedAlumno)
            return res.status(404).send('Alumno not found')
        else res.status(200).json(updatedAlumno.mundos)

    } catch (err) {
        res.status(500).send('Error updating niveles')
    }
})
module.exports = router