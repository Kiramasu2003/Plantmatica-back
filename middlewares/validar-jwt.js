const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            msg: 'Su sesion a expirado.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        req.uid = uid;

        const usuario = await User.findOne({ code: uid });

        //Usuario no existe ->>>
        if (!usuario) {
            return res.status(401).json({
                msg: "Debe iniciar sesion para realizar esta operacion."
            });
        }

        //Verificar si el usuario esta activo
        if (!usuario.state) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no activo"
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Su sesion a expirado. - Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}