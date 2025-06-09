var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var alumnos = require('../models/alumnos')
var profesores = require('../models/profesores')
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
router.get('/correo/:correo', function (req, res) {
    var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
    alumnos.findOne({ correo: correo }, function (err, alumno) {
        if (err) {
            res.status(500).send('Error retrieving alumno')
        }else {
            res.status(200).json(alumno)
        }
    })
})

router.get('/clasificacion/:aula', async (req, res) => {
    var aula= req.params.aula
    if (!mongoose.Types.ObjectId.isValid(aula)) {
        return res.status(400).send('Invalid aula ID')
    }
    try {
            const alumnosOrdenados = await alumnos.find({ aula: aula }).sort({ puntosTotales: -1 })
            res.status(200).json(alumnosOrdenados)
        }
     catch (err) {
        res.status(500).send('Error retrieving alumnos by aula')
    }
})

// POST a new alumno
router.post('/', async (req, res)=> {
    try{
        const { nombre, correo, password, aula } = req.body
        const existingAlumno = await alumnos.findOne({ correo: correo })
        const existingProfesor = await profesores.findOne({ correo: correo })
        const existingAula = await aulas.findOne({ codigo: aula })
        if (existingAlumno||existingProfesor) {
            return res.status(400).send('Usuario ya existe')
        } else if (!existingAula) {
            return res.status(404).send('Aula no existe')
        }
        else {
            const newAlumno = new alumnos({
                nombre,
                correo,
                password,
                aula: existingAula._id,
                mundos: defaultMundos(),
            })
            await newAlumno.save()
            res.status(201).json(newAlumno)
        }
    }catch(err){
        res.status(500).send('Error creating alumno')
    }

})


router.patch('/guardarprogreso/:correo', async (req, res) => {
    try {
        var correo = decodeURIComponent(req.params.correo).trim().toLowerCase()
        const { mundos, puntosTotales, estrellasTotales, insignias, biblioteca, avatar} = req.body
        const update= {}
        if (avatar) update.avatar = avatar
        if (biblioteca) update.biblioteca = biblioteca
        if (insignias) update.insignias = insignias
        if (mundos) update.mundos = mundos
        if (puntosTotales && typeof puntosTotales === 'number') update.puntosTotales = puntosTotales
        if (estrellasTotales && typeof estrellasTotales === 'number') update.estrellasTotales = estrellasTotales
        console.log(correo, update)
        const updatedAlumno = await alumnos.findOneAndUpdate(
            { correo: correo },
            { $set: update },
            { new: true }
        )

        if (!updatedAlumno)
            return res.status(404).send('Alumno not found')
        else res.status(200).json(updatedAlumno)

    } catch (err) {
        res.status(500).send('Error updating niveles')
    }
})
module.exports = router