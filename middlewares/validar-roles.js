const adminRole = async (req, res, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere validar el Rol sin verificar el token primero"
        });
    }

    const { username, rol } = req.usuario;

    if(rol !== 'Administrador'){
        return res.status(400).json({
            msg: `El usuario: ${username} no es Administrador. - Operacion invalida.`
        })
    }
    
    next();

}

module.exports = {
    adminRole
}