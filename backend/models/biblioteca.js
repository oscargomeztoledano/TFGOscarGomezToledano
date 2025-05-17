var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bibliotecaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('biblioteca', bibliotecaSchema, 'biblioteca')