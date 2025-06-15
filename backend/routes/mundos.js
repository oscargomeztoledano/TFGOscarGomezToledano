var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mundos = require('../models/mundos');
mongoose.set('strict', false);

// GET all mundos
router.get('/', async (req, res) => {
    try {
        const allMundos = await mundos.find();
        res.status(200).json(allMundos);
    } catch (err) {
        res.status(500).send('Error retrieving mundos');
    }
});
module.exports = router