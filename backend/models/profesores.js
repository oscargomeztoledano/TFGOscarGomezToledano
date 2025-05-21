var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profesoresSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    aulas: [{
        type: Number
    }]

});

module.exports = mongoose.model('profesores', profesoresSchema, 'profesores');