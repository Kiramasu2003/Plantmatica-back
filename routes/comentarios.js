//Modulo de comentarios
const { Router } = require('express');
const { check } = require('express-validator');
const { getComentariosFicha, comentarFicha, editarComentario, borrarComentario, reportComentario } = require('../controllers/comentarios');
const { crearFicha, conseguirTodasLasFichas, getFichaId } = require('../controllers/ficha');
//Controladores
const { existeUserID } = require('../helpers/validar-datos-user');
const { validarEtiquetas, validarDescripcion, existeFichaId, validarExistNombreComun, validarExistNombreCientifico } = require('../helpers/validarFicha');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

/* Comentar ficha
Param indica el ID de la ficha */
router.post('/:id', [
    validarJWT,
    check('comentario', 'El cuerpo del comentario no puede ir vacio.').notEmpty(),
    /* Usuario que comenta */
    check('id_user').isMongoId().custom(existeUserID),
    validarDatos
], comentarFicha);

/* Editar comentario id representa el id de la ficha */
router.put('/edit/:id', [
    validarJWT,
    check('id', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeFichaId),
    check('id_user', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeUserID),
    check('id_comentario', 'No es un ID valido. - Operacion invalida').isMongoId(),
    check('comentario', 'El cuerpo del comentario no puede ir vacio.').notEmpty(),
    validarDatos
], editarComentario);

/* Borrar un comentario por su ID */
router.put('/delete/:id', [
    validarJWT,
    check('id', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeFichaId),
    check('id_user', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeUserID),
    check('id_comentario', 'No es un ID valido. - Operacion invalida').isMongoId(),
    validarDatos
], borrarComentario);

/* Reportar comentario (NO FUNCIONA) */
router.put('/report/:id', [
    validarJWT,
    check('id_comentario', 'No es un ID valido. - Operacion invalida').isMongoId(),
    check('razon', 'La razon es obligatoria').notEmpty(),
    validarDatos,
], (req, res) => {
    res.json({
        msgError: 'De momento este funcionalidad no esta activa'
    })
});

module.exports = router;