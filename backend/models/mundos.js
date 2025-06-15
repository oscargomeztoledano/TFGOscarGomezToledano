var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mundosSchema = new Schema({
    nombre:{ type: String, required: true },
    niveles: [{
        nombre: { type: String, required: true },
        num: { type: Number, default: 0 },
    }]
});

module.exports = mongoose.model('mundos', mundosSchema, 'mundos');