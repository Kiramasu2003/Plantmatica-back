const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generarJWT } = require('../config/jwt');
const { getTemplate, sendEmail } = require('../config/mail');
const { validarJWT } = require('../middlewares/validar-jwt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const crearCuenta = async (req, res) => {

    try {
        const { username, correo, password, estadoMx, sexo, edad } = req.body;

        //generar codigo
        const code = uuidv4();
        const user = new User({ username, correo, password, estadoMx, sexo, edad, code });

        /* Generar webToken */
        const token = await generarJWT(code);

        /* Obtener template */
        const template = getTemplate(username, token);

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.json({
            msg: 'Se creo la cuenta de manera exitoso',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const actualizarDatosUsuario = async (req, res) => {

    const { id } = req.params;
    const { _id, correo, password, state, rol, reportes, ...dataResto } = req.body;

    const usuario = await User.findById(id);
    if (!usuario) {

        res.status(500).json({
            msg: 'Ocurrio un error, el usuario no existe'
        });

    } else {

        const validPass = bcryptjs.compareSync(password, usuario.password);
        if (!validPass) {

            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });

        } else {

            const userActualizado = await User.findById(id, dataResto);
            res.json({
                msg: 'Se actualizaron sus datos de manera exitosa',
                usuario,
                userActualizado
            })

        }

    }

}

const getUsuario = async (req, res) => {

    const { id } = req.params;
    const usuario = await User.findById(id);

    res.json({
        usuario
    });

}

const deleteUsuario = async (req, res) => {

    const { id } = req.params;
    await User.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: 'Se desactivo la cuenta con exito'
    })

}

const confirmarCrearCuenta = async (req, res) => {

    /* Se debe obtener el token desde los encabezados de la peticion */
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({
            msg: 'Su sesion a expirado.'
        });
    }
    
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        const usuario = await User.findOne({ code: uid });

        //Usuario no existe ->>>
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no existente"
            });
        }

        //Verificar si el usuario esta activo
        if (!usuario.state) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no activo"
            });
        }

        req.usuario = usuario;

        await User.findOneAndUpdate({ code: uid }, { status: 'VERIFIED' });

        res.json({
            msg: 'La verificacion de la cuenta concluido exitosamente'
        });

    } catch (error) {

        res.status(401).json({
            msg: 'Su sesion a expirado. - Token no valido 2',
            usuario
        });

    }


}

module.exports = {
    crearCuenta,
    getUsuario,
    deleteUsuario,
    actualizarDatosUsuario,
    confirmarCrearCuenta
}