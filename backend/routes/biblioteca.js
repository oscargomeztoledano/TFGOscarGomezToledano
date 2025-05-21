var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var biblioteca = require('../models/biblioteca')
mongoose.set('strict', false)


// GET all biblioteca
router.get('/', async (req, res) => {
    try {
        const biblioteca = await biblioteca.find()
        res.status(200).json(biblioteca)
    } catch (err) {
        res.status(500).send('Error retrieving biblioteca')
    }
})

// GET a single instancia by ID
router.get('/:id', function (req, res) {
    var id = req.params.id
    biblioteca.findOne({ _id: mongoose.Types.ObjectId(id) }, function (err, instancia) {
        if (err) {
            res.status(500).send('Error retrieving instancia')
        } else {
            res.status(200).json(instancia)
        }
    })

})
module.exports = router