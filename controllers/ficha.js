//FUNCIONALIDADES DE FICHAS RELACIONADO A LOS USUARIOS
const Ficha = require('../models/FichaPlanta');
const Etiqueta = require('../models/Etiquetas');
const User = require('../models/User');

const crearFicha = async (req, res) => {

    let {
        etiquetas,
        nombre_comun,
        nombre_cientifico,
        origen_distribucion,
        descripcion,
        complemento,
        usos_medicinales,
        consumo,
        fuentes,
        usuario_creo,
        caracteristicas_especiales,
        polemica
    } = req.body;

    //Crear las etiquetas y guardarlas en la bd
    guardarEtiquetasBD(etiquetas, nombre_comun, nombre_cientifico);

    //Agregar los id de las etiquetas a el modelo de Ficha
    /* let existeEtiqueta;
    let arrayIdEtiquetas = [];
    etiquetasGuardadas.forEach(async e => {
        existeEtiqueta = await Etiqueta.findOne({ etiqueta: e });
        arrayIdEtiquetas.push(existeEtiqueta._id);
    }); */
    //etiquetas = arrayIdEtiquetas;

    const ficha = new Ficha({
        etiquetas,
        nombre_comun,
        nombre_cientifico,
        complemento,
        origen_distribucion,
        descripcion,
        usos_medicinales,
        consumo,
        fuentes,
        datos_creacion: { usuario_creo },
        caracteristicas_especiales,
        polemica
    });

    const fichaAgregada = await ficha.save();

    res.json({
        msg: 'Ficha creadas correctamente',
        fichaAgregada
    });

}

//Crear las etiquetas y guardarlas en la bd
const guardarEtiquetasBD = async (etiquetas, nombreCo, nombreCien) => {

    let etiquetaFor;
    let existenciaEtiqueta;
    etiquetas.push(nombreCo);
    etiquetas.push(nombreCien)
    etiquetas.forEach(async e => {

        //Verifica la existencia de la etiqueta
        existenciaEtiqueta = await Etiqueta.findOne({ etiqueta: e });
        //Si las etiquetas no estan registradas previamente se agrega
        if (!existenciaEtiqueta) {
            etiquetaFor = new Etiqueta({ etiqueta: e });
            await etiquetaFor.save();
        }

    });

    return etiquetas;

}

//Conseguir una ficha por su ID de mongoose
const getFichaId = async (req, res) => {

    const { id } = req.params;
    const ficha = await Ficha.findById(id).populate("comentarios.id_usuario", 'username');

    res.json({
        ficha
    })

}

//Conseguir las fichas ya aceptadas por algun administrador
const conseguirTodasLasFichas = async (req, res) => {

    const [total, fichas] = await Promise.all([
        Ficha.countDocuments({ "estado_ficha.state": true }),
        Ficha.find({ "estado_ficha.state": true })
    ])

    res.json({
        total,
        fichas
    });

}

/* Conseguir solicitudes para agregar ficha agregadas y no agregadas por un usuario */
const conseguirFichasDeUsuario = async (req, res) => {

    const { id } = req.params;
    //const fichas = await Ficha.find({ "datos_creacion.usuario_creo": id  });
    const [total, fichas] = await Promise.all([
        Ficha.countDocuments({ "datos_creacion.usuario_creo": id }),
        Ficha.find({ "datos_creacion.usuario_creo": id })
    ])

    res.json({
        total,
        fichas
    })

}

const guardarFicha = async (req, res) => {

    const { id } = req.params;
    const { id_user } = req.body;

    await User.findByIdAndUpdate(id_user, {
        $addToSet: {
            'fichas_guardadas': id
        }
    });

    res.json({
        msg: 'La ficha se guardo exitosamente'
    });

}

const conseguirFichasGuardadasUsuario = async (req, res) => {

    const { id_user } = req.params;

    const fichas_guardadas = await User.findById(id_user).populate('fichas_guardadas');

    res.json({
        fichas_guardadas
    })

}

const eliminarFichaGuardada = async (req, res) => {

    const { id } = req.params;
    const { id_user } = req.body;

    await User.findByIdAndUpdate(id_user, {
        $pull: {
            'fichas_guardadas': id
        }
    });

    res.json({
        msg: 'Se a eliminado correctamente la ficha de tus guardados.'
    });

}

module.exports = {
    crearFicha,
    conseguirTodasLasFichas,
    getFichaId,
    guardarEtiquetasBD,
    conseguirFichasDeUsuario,
    guardarFicha,
    eliminarFichaGuardada,
    conseguirFichasGuardadasUsuario
}