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
    niveles:[{ num: Number, completado: Boolean, puntos: Number, estrellas: Number, _id: false }],
})

var profesoresSchema = new Schema({
    nombre: String,
    correo: String,
    password: String,
    aulas: [{ type: Schema.Types.ObjectId, ref: 'aulas' }],
    avatar: Number,
    insignias: [String],
    biblioteca: [String],
    progreso:{
        type: [progresoSchema], _id: false
    },
    puntosTotales: Number,
    estrellasTotales: Number,
});

module.exports = mongoose.model('profesores', profesoresSchema, 'profesores');