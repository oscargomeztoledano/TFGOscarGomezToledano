var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var aulas = require('../models/aulas')
mongoose.set('strict', false)


// GET all aulas
router.get('/:aula', async (req, res) => {
   const aulaID = req.params.aula
   if (!mongoose.Types.ObjectId.isValid(aulaID)) {
       return res.status(400).send('Invalid aula ID')
   }
   try{
    const aula= await aulas.findById(aulaID)
    if (!aula) {
        return res.status(404).send('Aula not found')
    }
    res.status(200).json(aula)
   } catch (err) {
       res.status(500).send('Error al recuperar el aula')
   }
})

router.patch('/guardarMundo/:aula', async (req, res) => {
    try {
        var aula = req.params.aula
        if (!mongoose.Types.ObjectId.isValid(aula)) {
            return res.status(400).send('Invalid aula ID')
        }
        const {mundos} = req.body
        const update= {}
        if (mundos) update.mundos = mundos
        const updatedAula = await aulas.findByIdAndUpdate(
            aula,
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