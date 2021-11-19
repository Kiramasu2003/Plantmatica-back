const { Router } = require('express');
const { check } = require('express-validator');
const { iniciarSesion, validarTokenFront } = require('../controllers/login');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('correo', 'Campo obligatorio').notEmpty(),
    check('password', 'Campo obligatorio').notEmpty(),
    validarDatos
], iniciarSesion);

router.put('/token/:tokenv', [
    validarJWT,
    validarDatos
], validarTokenFront);

module.exports = router;