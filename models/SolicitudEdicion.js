const mongoose = require('mongoose');
let fechaSch = new Date();

const SolicitudEdicion = mongoose.Schema({

    id_referencia_planta: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    imagenes: [{
        type: String
    }],
    etiquetas: [{
        type: String,
    }],
    nombre_comun: {
        type: String,
        required: true,
    },
    nombre_cientifico: {
        type: String,
        required: true,
    },
    origen_distribucion: [
        {
            nombre: {
                type: String
            },
            detalles: {
                type: String
            }
        }
    ],
    descripcion: {
        type: String,
        required: true
    },
    caracteristicas_especiales: [{
        type: String,
    }],
    complemento: {
        type: String,
    },
    consumo: [{
        type: String,
    }],
    usos_medicinales: [{
        type: String
    }],
    fuentes: [{
        type: String,
        required: true
    }],
    estado_ficha: {
        state: {
            type: Boolean,
            default: false,
        },
        admin_acepto: {
            type: mongoose.Schema.Types.ObjectId,
        },
    },
    datos_edicion: {
        fecha: {
            dia: {
                type: Date,
                default: fechaSch.getDay()
            },
            mes: {
                type: Date,
                default: fechaSch.getMonth()
            },
            year: {
                type: Date,
                default: fechaSch.getFullYear()
            }
        },
        usuario_edicion: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        aceptada: {
            type: Boolean,
            default: false
        }
    }

});

module.exports = mongoose.model('SolicitudEdicion', SolicitudEdicion);