const Solicitud = require('../models/SolicitudEdicion');
const Ficha = require('../models/FichaPlanta');

const existeSolicitudID = async (id) => {

    const exist = await Solicitud.findById(id);
    if(!exist){
        throw new Error(`No existe una solicitud de edicion con el ID: ${id}`)
    }

}

module.exports = {
    existeSolicitudID
}