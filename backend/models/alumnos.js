var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
var nivelesSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    puntos: {type:number, default: 0},
    estrellas: {type:number, default: 0},
})
var insignasSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    obtenido: {
        type: Boolean,
        default: false
    },
})
var bibliotecaSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'biblioteca'
    },
    obtenido: {
        type: Boolean,
        default: false
    },
})
var puntuacionSchema = new Schema({
    puntosTotales: {
        type: Number,
        default: 0
    },
    estrellasTotales: {
        type: Number,
        default: 0
    },
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
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'aulas'
        },
        required: true
    },
    avatar: {type:number, default: 0},
    mundos:[mundosSchema],
    insignas:[insignasSchema],
    biblioteca:[bibliotecaSchema],
    puntuacion:[puntuacionSchema],
})

module.exports = mongoose.model('alumnos', alumnosSchema, 'alumnos');