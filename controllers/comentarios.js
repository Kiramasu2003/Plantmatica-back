const { existeComentarioID, verificarUsuario } = require('../helpers/validar-comentario');
const Ficha = require('../models/FichaPlanta');
const User = require('../models/User');

const comentarFicha = async (req, res) => {

    const { id } = req.params;
    const { comentario, id_user } = req.body;

    await Ficha.findByIdAndUpdate(id, {
        $push: {
            'comentarios': {
                'id_usuario': id_user,
                'comentario': comentario
            }
        }
    });

    res.json({
        msg: 'Se ha comentado con exito.'
    })

}

const editarComentario = async (req, res) => {

    const { id } = req.params;
    const { id_comentario, id_user, comentario } = req.body;
    /* Verifica la existencia del comentario */
    const exist = await existeComentarioID(id, id_user, id_comentario);
    if(exist){

        await Ficha.updateOne({ comentarios: {
            _id: id_comentario
        }}, comentario);    

        res.json({
            msg: 'Comentario actualizado con exito',
            usuarioIgual
        });

    }else{
        res.status(400).json({
            msgError: 'No se encontro el comentario ocurrio un error. - ID inexistente'
        })
    }

}

const borrarComentario = async (req, res) => {

    const { id } = req.params;
    const { id_comentario, id_user } = req.body;
    /* Verifica la existencia del comentario */
    const exist = await existeComentarioID(id, id_user, id_comentario);
    if(exist){

        await Ficha.findByIdAndUpdate(id, {
            $pull: {
                'comentarios': {
                    "_id": id_comentario
                }
            }
        });

        res.json({
            msg: "Se borro el comentario con exito"
        });

    }else{
        res.status(400).json({
            msgError: 'No se encontro el comentario ocurrio un error. - ID inexistente'
        })
    }

}

/* NO FUNCIONA */
const reportComentario = async (req, res) => {

    const { id } = req.params;
    const { id_comentario, razon, detalles } = req.params;

    await Ficha.findByIdAndUpdate(id, {
        $set: {
            'comentarios': {
                '_id': id_comentario,
                'numero_reportes': + 1
            }
        }
    })
    
    const ficha = await Ficha.findById(id);
    const comentarios = await ficha.comentarios;

    res.json({
        msg: 'Comentario reportado con exito',
        comentarios
    });

}

module.exports = {
    comentarFicha,
    editarComentario,
    borrarComentario,
    reportComentario
}