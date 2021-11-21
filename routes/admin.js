//Modulos de ficha y usuario (OPERACIONES QUE SOLO PUEDA REALIZAR EL ADMINISTRADOR)
//NOTA: SE REUSAN ALGUNOS CONTROLADORES DE FICHA Y USUARIO
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, fichasNoAceptadas, manipularSolicitudAgregar, todasLasFichaschsm, manipularSolicitudEdicion, getSolicitudes, eliminarFichaDefinitivamente, validarAdministrador } = require('../controllers/admin');
const { getFichaId } = require('../controllers/ficha');
//Controladores
const { existEmail, existUser, validS, validResidencia, existeUserID, existeAdminID } = require('../helpers/validar-datos-user');
const { existeSolicitudID } = require('../helpers/validar-solicitud');
const { existeFichaIdAdmin } = require('../helpers/validarFicha');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminRole } = require('../middlewares/validar-roles');
const router = Router();

//Validar que es administrador 
router.put('/valid', [
    validarJWT,
    adminRole,
    validarDatos
], validarAdministrador);

/* Aceptar o rechazar solicitud de edicion */
router.put('/solicitud/:id/:control', [
    validarJWT,
    adminRole,
    check('idAdmin', 'No es un ID valido - Admin').isMongoId().custom(existeAdminID),
    check('id', 'No es un ID valido - Solicitud').isMongoId().custom(existeSolicitudID),
    check('control', 'Debe ser enviado en (true/false)').isBoolean().notEmpty(),
    validarDatos
], manipularSolicitudEdicion);

router.delete('/delete/ficha/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un ID valido.').isMongoId().custom(existeFichaIdAdmin),
    validarDatos
], eliminarFichaDefinitivamente);

/* Conseguir solicitudes de edicion */
router.get('/solicitud', [
    validarJWT,
    adminRole,
], getSolicitudes);

/* Conseguir usuarios */
router.get('/', [
    validarJWT,
    adminRole,
], getUsuarios);

//Aceptar o rechazar ficha
router.put('/fichaControl/:id', [
    validarJWT,
    adminRole,
    check('idAdmin', 'No es un ID valido - Admin').isMongoId().custom(existeAdminID),
    check('id', 'No es un ID valido - Ficha').isMongoId().custom(existeFichaIdAdmin),
    check('control', 'Debe ser enviado en (true/false)').isBoolean().notEmpty(),
    validarDatos
], manipularSolicitudAgregar);

//Obtener las fichas no aceptadas por algun administrador
router.get('/fichas', [
    validarJWT,
    adminRole,
], fichasNoAceptadas);

//Obtener una ficha por id
router.get('/ficha/:id', [
    validarJWT,
    adminRole,
    check('id').isMongoId().custom(existeFichaIdAdmin),
    validarDatos
], getFichaId);

router.get('/comodin', todasLasFichaschsm);

module.exports = router;