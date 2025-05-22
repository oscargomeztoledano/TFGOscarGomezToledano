var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var aulas = require('../models/aulas')
mongoose.set('strict', false)


// GET all aulas
router.get('/:aula', async (req, res) => {
   var aula = req.params.aula
   aulas.findOne({ codigo: aula }, function (err, aula) {
       if (err) {
           res.status(500).send('Error retrieving aula')
       } else if(!aula) {
           res.status(404).send('Aula not found')
       }else {
           res.status(200).json(aula)
       }
   })
})

router.patch('/guardarMundo/:aula', async (req, res) => {
    try {
        var aula = decodeURIComponent(req.params.aula).toLowerCase()
        const {mundos} = req.body
        const update= {}
        if (mundos) update.mundos = mundos
        console.log(aula, update)
        const updatedAula = await aulas.findOneAndUpdate(
            { codigo: aula },
            { $set: update },
            { new: true }
        )
        if (!updatedAula) 
            return res.status(404).send('Aula not found')
        else res.status(200).json(updatedAula)
    } catch (err) {
        console.error(err)
        res.status(500).send('Error updating aula')
    }
})


module.exports = router