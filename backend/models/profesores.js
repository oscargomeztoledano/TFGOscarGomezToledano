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
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'aulas'
        }
    }]

});

module.exports = mongoose.model('profesores', profesoresSchema, 'profesores');