//Modulo de usuario normal
const { Router } = require('express');
const { check } = require('express-validator');
//Controladores
const { crearCuenta, getUsuario, deleteUsuario, actualizarDatosUsuario, confirm, confirmarCrearCuenta } = require('../controllers/user');
const { existEmail, existUser, validS, validResidencia, existeUserID } = require('../helpers/validar-datos-user');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//Crear cuenta de usuario
router.post('/', [
    check('username', 'El nombre de usuario debe ser de 5 a 15 caracteres').isLength({ min: 5, max: 15 }).custom(existUser),
    check('foto', 'Es obligatorio usar una fotografia').notEmpty(),
    check('correo', 'Formato de correo no valido').isEmail().custom(existEmail),
    check('password', 'La contraseña debe ser de de 6 a 15 caracteres').isLength({ min: 5, max: 15 }),
    check('edad', 'Formato de edad invalido').isNumeric(),
    check('sexo', 'Dato no valido').custom(validS),
    check('estadoMx', 'Estado de residencia no valido').custom(validResidencia),
    validarDatos
], crearCuenta);

/* Confirmar la creacion de la cuenta */
router.put('/confirmar/:token', [
    validarDatos
], confirmarCrearCuenta);

//Conseguir informacion de un usuario
router.get('/:id', [
    validarJWT,
    check('id', 'Ocurrio un error').isMongoId(),
    check('id', 'Ocurrio un error').custom(existeUserID),
    validarDatos
], getUsuario);

//Borrar cuenta usuario
router.delete('/:id', [
    validarJWT,
    check('id', 'Ocurrio un error').isMongoId(),
    check('id', 'Ocurrio un error').custom(existeUserID),
    validarDatos
], deleteUsuario);

//No actualiza edad
router.put('/:id', [
    validarJWT,
    check('id', 'Ocurrio un error').isMongoId(),
    check('id', 'Ocurrio un error').custom(existeUserID),
    check('foto', 'Ocurrio un error').notEmpty(),
    check('password', 'Es obligatorio introducir la contraseña').notEmpty(),
    check('sexo', 'Dato no valido').custom(validS),
    check('edad', 'Edad no valida').isInt(),
    check('estadoMx', 'Estado de residencia no valido').custom(validResidencia),
    validarDatos
], actualizarDatosUsuario)


module.exports = router;