var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nivelesSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    desbloqueado: {
        type: Boolean,
        default: false
    },
    puntos: {type:Number, default: 0},
    num: {type:Number, default: 0},
    estrellas: {type:Number, default: 0},
})
var mundosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    niveles:[nivelesSchema]
})

var alumnosSchema = new Schema({
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
    aula: {
        type: Schema.Types.ObjectId,
        ref: 'aulas',
        required: true
    },
    avatar: {type: Number, default: 0},
    mundos:[mundosSchema],
    insignias:{type: [String], default: []},
    biblioteca:{type: [String], default: ['Conceptos básicos']},
    puntosTotales: {type: Number, default: 0},
    estrellasTotales: {type: Number, default: 0},
})

module.exports = mongoose.model('alumnos', alumnosSchema, 'alumnos');