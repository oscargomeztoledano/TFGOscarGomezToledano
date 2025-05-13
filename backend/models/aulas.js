var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aulasSchema = new Schema({
    codigoPublico: {
        type: Number,
        required: true
    },
    profesores:[{_id: {type:Schema.Types.ObjectId, ref: 'profesores'}}]
})
    
module.exports = mongoose.model('aulas', aulasSchema, 'aulas')