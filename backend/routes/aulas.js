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


module.exports = router