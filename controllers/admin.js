//Modulos de ficha y usuario (OPERACIONES QUE SOLO PUEDA REALIZAR EL ADMINISTRADOR)
const User = require('../models/User');
const Ficha = require('../models/FichaPlanta');
const Solicitud = require('../models/SolicitudEdicion');
const jwt = require('jsonwebtoken');

const validarAdministrador = async (req, res) => {
    const { token } = req.body;
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
    const admin = await User.findOne({ code: uid });
    res.json({
        admin: true,
        adminID: admin._id
    })
}

/* Una por una y se require el ID */
const manipularSolicitudEdicion = async (req, res) => {

    /* Al aceptar la edicion se borrara de las solicitudes de edicion y pasara a ser la nueva ficha */
    const { id, control } = req.params;
    const solicitud = await Solicitud.findById(id);

    if (control == true) {
        await Ficha.findByIdAndUpdate(solicitud.id_referencia_planta, {
            imagenes: solicitud.imagenes,
            etiquetas: solicitud.etiquetas,
            nombre_comun: solicitud.nombre_comun,
            nombre_cientifico: solicitud.nombre_cientifico,
            origen_distribucion: solicitud.origen_distribucion,
            descripcion: solicitud.descripcion,
            caracteristicas_especiales: solicitud.caracteristicas_especiales,
            complemento: solicitud.complemento,
            consumo: solicitud.consumo,
            usos_medicinales: solicitud.usos_medicinales,
            fuentes: solicitud.fuentes
        });

        await Solicitud.findByIdAndDelete(id);

        res.json({
            msg: 'Solicitud de edicion aceptada'
        });
    } else {
        await Solicitud.findByIdAndDelete(id);

        res.json({
            msg: 'Solicitud de edicion rechazada'
        });
    }


}

/* Conseguir solicitudes (TODAS) */
const getSolicitudes = async (req, res) => {

    const [total, solicitudes] = await Promise.all([
        Solicitud.countDocuments(),
        Solicitud.find()
    ]);

    res.json({
        total,
        solicitudes
    });

}

//Aceptar solicitud de agregar ficha (SI JALA)
const manipularSolicitudAgregar = async (req, res) => {

    const { idAdmin, control } = req.body;
    const { id } = req.params;

    const igual = await Ficha.findById(id);

    /* No se permite que un administrador acepte su propia ficha */
    if (control == true) {

        if (igual.datos_creacion.usuario_creo == idAdmin) {

            return res.status(400).json({
                msg: 'Un administrador no puede aceptar la misma ficha que creo'
            });

        } else {

            await Ficha.findByIdAndUpdate(id, {
                estado_ficha: {
                    state: control,
                    admin_acepto: idAdmin
                },
            });

            return res.json({
                msg: `La ficha a sido aceptada`
            });

        }

    }

    if (control == false) {
        await Ficha.findByIdAndDelete(id);

        return res.json({
            msg: 'La ficha ha sido rechazada'
        });
    }

}

//Conseguir todos los usuarios que decida el administrador
const getUsuarios = async (req, res) => {

    const { limite = 20, desde = 0, estadoUsuario = true } = req.body;
    const [total, usuarios] = await Promise.all([
        User.countDocuments(),
        User.find({ state: estadoUsuario })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });

}

//Conseguir las fichas no aceptadas 
const fichasNoAceptadas = async (req, res) => {

    //const fichas = await Ficha.find({ estado_ficha: { state: false }});
    const { limite = 20, desde = 0 } = req.body;
    const [total, fichas, totalSinRestricciones] = await Promise.all([
        Ficha.countDocuments({ estado_ficha: { state: false } }),
        Ficha.find({ estado_ficha: { state: false } })
            .skip(Number(desde))
            .limit(Number(limite)),
        Ficha.countDocuments(),
    ]);

    res.json({
        fichas,
        noAceptadas: total,
        fichastotales: `El numero de ficha totales (Aceptadas o no aceptadas) es de: ${totalSinRestricciones}`
    });

}

const todasLasFichaschsm = async (req, res) => {

    const [totales, fichas] = await Promise.all([
        Ficha.countDocuments(),
        Ficha.find()
    ])
    res.json({
        totales,
        fichas
    })

}

const eliminarFichaDefinitivamente = async (req, res) => {

    const { id } = req.params;
    await Ficha.findByIdAndDelete(id);

    res.json({
        msg: 'Se ha borrado la ficha definitivamente.'
    });

}

module.exports = {
    getUsuarios,
    fichasNoAceptadas,
    manipularSolicitudAgregar,
    todasLasFichaschsm,
    manipularSolicitudEdicion,
    getSolicitudes,
    eliminarFichaDefinitivamente,
    validarAdministrador
}