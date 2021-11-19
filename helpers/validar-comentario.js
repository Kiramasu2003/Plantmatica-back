const Ficha = require('../models/FichaPlanta');

/* Verifica la existencia de un comentario por su ID */
const existeComentarioID = async (id_ficha, id_usuario, id_comentario) => {

    const existe = await Ficha.findOne({ id_comentario });
    return existe;
    
}

/* Verifica si el usuario que quiere realizar la operacion es el mismo que comento inicalmente
con excepciones a administradores */
const verificarUsuario = async (id_ficha, id_usuario, id_comentario) => {


}

module.exports = {
    existeComentarioID,
    verificarUsuario
}