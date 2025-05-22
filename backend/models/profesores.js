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

var profesoresSchema = new Schema({
    nombre: String,
    correo: String,
    password: String,
    aulas: [Number],
    aula: Number,
    avatar: Number,
    insignias: [String],
    biblioteca: [String],
    mundos:[mundosSchema],
    puntosTotales: Number,
    estrellasTotales: Number,
});

module.exports = mongoose.model('profesores', profesoresSchema, 'profesores');