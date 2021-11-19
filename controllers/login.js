const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../config/jwt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const iniciarSesion = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo o password no son correctos'
            })
        }

        const validClave = bcryptjs.compareSync(password, usuario.password);
        if (!validClave) {
            return res.status(400).json({
                msg: 'Correo o password no son correctos'
            })
        }

        /* Se genera con el elemento de 'code' del elemento usuario, es absolutamente necesario que 
        el token se asigne en los headers de la peticion con el nombre de 'x-token', ya que de esta forma se valida el token */
        const token = await generarJWT(usuario.code);

        return res.json({
            msg: 'Inicio de sesion exitoso.',
            token
        });

    } catch (error) {

        return res.status(500).json({
            msg: 'Ocurrio un error'
        });

    }


}

const validarTokenFront = async (req, res) => {

    const { tokenv } = req.params;
    const { uid } = jwt.verify(tokenv, process.env.SECRETORPUBLICKEY);

    const usuario = await User.findOne({ code: uid });

    res.json({
        auth: true,
        id: usuario._id
    });
}

module.exports = {
    iniciarSesion,
    validarTokenFront
}