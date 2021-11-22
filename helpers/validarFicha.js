const Etiqueta = require('../models/Etiquetas');
const FichaPlanta = require('../models/FichaPlanta');

//Recibir un array desde la peticion del usuario (req.body)
const validarEtiquetas = (etiquetas) => {

    if (etiquetas.length < 1) {
        throw new Error(`Debe tener al menos una etiquetas.`);
    }

    if (etiquetas.length > 10) {
        throw new Error(`La capacidad maxima de etiquetas por ficha es de 10.`)
    }

}

const validarImagen = (imagen) => {

    if (imagen.length < 1) {
        throw new Error(`Debe tener una foto de referencia.`);
    }

    if (etiquetas.length > 1) {
        throw new Error(`Unicamente se necesita una imagen.`);
    }

}

const validarExistNombreComun = async (nombre_comun) => {

    const existe = await FichaPlanta.findOne({ nombre_comun });
    if(existe){
        throw new Error(`Ya existe una planta con el nombre cientifico de: ${nombre_comun}, ID: ${existe._id}`);
    }

}

const validarExistNombreCientifico = async (nombre_cientifico) => {

    const existe = await FichaPlanta.findOne({ nombre_cientifico });
    if(existe){
        throw new Error(`Ya existe una planta con el nombre cientifico de: ${nombre_cientifico}, ID: ${existe._id}`);
    }

}

//Valida si no existe alguna planta con la descripcion identica de la otra (NO JALA JEJE)
const validarDescripcion = async (descripciion) => {

    const existDescripcion = await FichaPlanta.findOne({ descripciion });
    if (existDescripcion) {
        throw new Error(`Descripcion: ${descripciion} DESCRIPCION: ${existDescripcion.descripcion}`)
        /* throw new Error(`Ya existe una descripcion identica a esta: (Nombre comun: ${existDescripcion.nombre_comun}, Nombre cientifico: ${existDescripcion.nombre_cientifico}), ID: ${existDescripcion._id}`); */
    }

}

//Verifica que una ficha exista y que ya haya sido aceptada por algun administrador
const existeFichaId = async (id) => {

    const existe = await FichaPlanta.findById(id);
    if (!existe) {
        throw new Error(`No existe alguna ficha con el id: ${id}`)
    } else {
        if (!existe.estado_ficha.state) {
            throw new Error(`La ficha existe, pero no ha sido aceptado por algun administrador. - Operacion invalida`)
        }
    }

}

const existeFichaIdAdmin = async (id) => {

    const existe = await FichaPlanta.findById(id);
    if (!existe) {
        throw new Error(`No existe alguna ficha con el id: ${id}`)
    }

}

module.exports = {
    validarEtiquetas,
    validarDescripcion,
    existeFichaId,
    validarExistNombreComun,
    validarExistNombreCientifico,
    existeFichaIdAdmin
}