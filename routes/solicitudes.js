const { Router } = require('express');
const { check } = require('express-validator');
const { solicitarEdicion } = require('../controllers/solicitudes');
//Controladores
const { existeUserID } = require('../helpers/validar-datos-user');
const { validarEtiquetas, validarDescripcion, existeFichaId, validarExistNombreComun, validarExistNombreCientifico } = require('../helpers/validarFicha');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

/* Solicitar edicion de una ficha (Requiere modelo unico para las ediciones) */
router.post('/:id', [
    validarJWT,
    //check('etiquetas').custom(validarEtiquetas),
    check('id').isMongoId().custom(existeFichaId),
    check('complemento', 'El complemento no puede ir vacio').notEmpty(),
    check('nombre_comun', 'El nombre comun es obligatorio').notEmpty(),
    check('nombre_cientifico', 'El nombre cientifico es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es un campo obligatorio').notEmpty(),
    check('usuario_edicion', 'Ocurrio un error (ID usuario que solicita la edicion)').isMongoId().custom(existeUserID),
    validarDatos
], solicitarEdicion);

module.exports = router;