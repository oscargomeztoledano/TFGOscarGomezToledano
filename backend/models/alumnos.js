var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var progresoSchema = new Schema({
    mundoID: {
        type: Schema.Types.ObjectId,
        ref: 'mundos',
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    niveles:[{ nombre: String,completado: Boolean, puntos: Number, estrellas: Number , _id:false}]
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
    progreso:{
        type: [progresoSchema], _id: false
    },
    insignias:{type: [String], default: []},
    biblioteca:{type: [String], default: ['Conceptos básicos']},
    puntosTotales: {type: Number, default: 0},
    estrellasTotales: {type: Number, default: 0},
})

module.exports = mongoose.model('alumnos', alumnosSchema, 'alumnos');