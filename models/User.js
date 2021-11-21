const mongoose = require('mongoose');
let fechaSch = new Date();

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    foto: {
        type: String,
        required: [true, 'foto is required'],
        unique: false
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contrasena requerida']
    },
    estadoMx: {
        type: String,
        emun: [
            'no',
            'Resido fuera del pais',
            'Aguascalientes',
            'Baja California',
            'Baja California Sur',
            'Campeche',
            'Chiapas',
            'Chihuahua',
            'Coahuila de Zaragoza',
            'Colima',
            'CDMX',
            'Durango',
            'Guanajuato',
            'Guerrero',
            'Hidalgo',
            'Jalisco',
            'Estado de Mexico',
            'Michoacan de Ocampo',
            'Morelos',
            'Nayarit',
            'Nuevo Leon',
            'Oaxaca',
            'Puebla',
            'Queretaro de Arteaga',
            'Quintana Roo',
            'San Luis Potosi',
            'Sinaloa',
            'Sonora',
            'Tabasco',
            'Tamaulipas',
            'Tlaxcala',
            'Veracruz de Ignacio de la Llave',
            'Yucatan',
            'Zacatecas',
        ]
    },
    sexo: {
        type: String,
        emun: [
            'Masculino',
            'Femenino',
            'Prefiero no decirlo'
        ]
    },
    edad: {
        type: Number
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'UNVERIFIED'
    },
    state: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        required: true,
        default: "Usuario",
        emun: ['Usuario', 'Administrador']
    },
    fichas_guardadas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FichaPlanta',
    }],
    reportes: [
        {
            id_usuario: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            razon: {
                type: String
            },
            detalles: {
                type: String,
                default: "No hay detalles registrados."
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
    ]
});

module.exports = mongoose.model('User', UserSchema);

