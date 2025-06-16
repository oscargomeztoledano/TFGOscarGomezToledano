var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aulasSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    mundos: { type: [String], default: [] },
})
    
module.exports = mongoose.model('aulas', aulasSchema, 'aulas')