const Solicitud = require('../models/SolicitudEdicion');
const Etiqueta = require('../models/Etiquetas');
const { guardarEtiquetasBD } = require('../controllers/ficha')
const FichaPlanta = require('../models/FichaPlanta');

const solicitarEdicion = async (req, res) => {

    const { id } = req.params;
    const {
        etiquetas,
        nombre_comun,
        nombre_cientifico,
        origen_distribucion,
        descripcion,
        complemento,
        usos_medicinales,
        consumo,
        fuentes,
        usuario_edicion,
        caracteristicas_especiales,
    } = req.body;
    /* Crear variable de validacion (nombre) */
    let validacionNombres = false;

    const existe = await FichaPlanta.findById(id);
    if (!existe) {
        res.status(400).json({
            msg: `La ficha con el ID: ${id} no existe`,
            existe
        })
    } else {
        if (nombre_comun != existe.nombre_comun) {
            const validarCo = await FichaPlanta.findOne({ nombre_comun });
            if (validarCo) {
                validacionNombres = true;
                return res.status(400).json({
                    msg: `Ya existe una planta con el nombre comun de: ${nombre_comun}, ID: ${existe._id}`
                });
            }
        }
        if (nombre_cientifico != existe.nombre_cientifico) {
            const validarCien = await FichaPlanta.findOne({ nombre_cientifico });
            if (validarCien) {
                validacionNombres = true;
                return res.status(400).json({
                    msg: `Ya existe una planta con el nombre cientifico de: ${nombre_cientifico}, ID: ${existe._id}`
                });
            }
        }
    }

    if (!validacionNombres) {

        const solicitud = new Solicitud({
            id_referencia_planta: id,
            etiquetas,
            nombre_comun,
            nombre_cientifico,
            complemento,
            origen_distribucion,
            descripcion,
            usos_medicinales,
            consumo,
            fuentes,
            datos_edicion: { usuario_edicion },
            caracteristicas_especiales
        });

        const sol = await solicitud.save();
        //Crear las etiquetas y guardarlas en la bd
        guardarEtiquetasBD(etiquetas);

        //Agregar los id de las etiquetas a el modelo de Ficha
        let existeEtiqueta;
        let arrayIdEtiquetas = [];
        etiquetas.forEach(async e => {
            existeEtiqueta = await Etiqueta.findOne({ etiqueta: e });
            arrayIdEtiquetas.push(existeEtiqueta._id);
        });

        res.json({
            msg: 'Se realizo la solicitud de edicion con exito',
            sol,
        });

    }

}

module.exports = {
    solicitarEdicion
}