const mongoose = require('mongoose');

const SchemaEtiqueta = mongoose.Schema({

    estadoEti: {
        type: Boolean,
        default: true,
        //unique: true
    },
    etiqueta: {
        type: String,
        unique: true,
        required: true 
    }

})

module.exports = mongoose.model('Etiqueta', SchemaEtiqueta);