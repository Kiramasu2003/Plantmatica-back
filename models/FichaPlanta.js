const mongoose = require('mongoose');
let fechaSch = new Date();
const FichaSchema = mongoose.Schema({

    imagenes: [{
        type: String
    }],
    etiquetas: [{
        type: String,
    }],
    nombre_comun: {
        type: String,
        required: true,
        unique: true,
    },
    nombre_cientifico: {
        type: String,
        required: true,
        unique: true,
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
    polemica: {
        type: Boolean,
        default: false
    },
    datos_creacion: {
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
        usuario_creo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    comentarios: [
        {
            id_usuario: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            comentario: {
                type: String,
                required: true
            },
            numero_reportes: {
                type: Number,
                default: 0
            },
            estado_comentario: {
                type: Boolean,
                default: true
            },
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
        }
    ],
    estado_ficha: {
        state: {
            type: Boolean,
            default: false,
        },
        admin_acepto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }

});

module.exports = mongoose.model('FichaPlanta', FichaSchema);