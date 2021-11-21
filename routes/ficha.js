//Modulo de fichas para los usuarios
const { Router } = require('express');
const { check } = require('express-validator');
const { crearFicha, conseguirTodasLasFichas, getFichaId, conseguirFichasDeUsuario, guardarFicha, eliminarFichaGuardada, conseguirFichasGuardadasUsuario } = require('../controllers/ficha');
const { getEtiquetas, buscarCoincidencias } = require('../controllers/search');
//Controladores
const { existeUserID } = require('../helpers/validar-datos-user');
const { validarEtiquetas, validarDescripcion, existeFichaId, validarExistNombreComun, validarExistNombreCientifico } = require('../helpers/validarFicha');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// Agregar una ficha 
router.post('/', [
    validarJWT,
    //check('etiquetas').custom(validarEtiquetas),
    check('imagenes', 'Es obligatorio que la ficha tenga una img como referencia').notEmpty(),
    check('complemento', 'El complemento no puede ir vacio').notEmpty(),
    check('nombre_comun', 'El nombre comun es obligatorio').notEmpty().custom(validarExistNombreComun),
    check('nombre_cientifico', 'El nombre cientifico es obligatorio').notEmpty().custom(validarExistNombreCientifico),
    check('descripcion', 'La descripcion es un campo obligatorio').notEmpty(),
    check('usuario_creo', 'Ocurrio un error - No es un ID valido de mongo').isMongoId(),
    check('usuario_creo').custom(existeUserID),
    validarDatos
], crearFicha);

/* Guardar una ficha (individual de cada usuario) */
router.post('/guardar/:id', [
    validarJWT,
    check('id', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeFichaId),
    check('id_user', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeUserID),
    validarDatos
], guardarFicha);

router.delete('/guardadas/delete/:id', [
    validarJWT,
    check('id', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeFichaId),
    check('id_user', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeUserID),
    validarDatos
], eliminarFichaGuardada);

/* Conseguir solicitudes para agregar ficha agregadas y no agregadas por un usuario */
router.get('/usuario/:id', [
    validarJWT,
    check('id', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeUserID),
    validarDatos
], conseguirFichasDeUsuario);

/* Conseguir fichas guardadas */
router.get('/guardadas/:id_user', [
    validarJWT,
    check('id_user', 'No es un ID valido. - Operacion invalida').isMongoId().custom(existeUserID),
    validarDatos
], conseguirFichasGuardadasUsuario);

//Conseguir las fichas ya aceptadas por algun administrador
router.get('/', conseguirTodasLasFichas);

//Obtener una ficha por su id
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId().custom(existeFichaId),
    validarDatos
], getFichaId);

/* Paranetros de busqueda */

router.get('/buscar/etiquetas', getEtiquetas);

router.put('/encontrar/coincidencia/', [
    check('termino', 'El termino de busqueda no puede ir vacio').notEmpty(),
    validarDatos
], buscarCoincidencias);

module.exports = router;