const User = require('../models/User');
//VARIABLE PARA USAR NODEMAILER

const existEmail = async (correo = '') => {

    const email = await (User.findOne({ correo }));
    if (email) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }

}
const existeUserID = async (id) => {

    const usuario = await User.findById(id);
    if (!usuario) {
        throw new Error(`Usuario no existe `);
    }

}

const existeAdminID = async (id) => {
    
    const usuario = await User.findById(id);
    if(!usuario){
        throw new Error(`Usuario no existe `);
    }else{
        if(usuario.rol != 'Administrador'){
            throw new Error(`El usuario: ${usuario.username} no es administrador, no permitido`)
        }
    }

}

const existUser = async (username) => {

    const existeUser = await User.findOne({ username });
    if (existeUser) {
        throw new Error(`El nombre de usuario ${username} ya esta en uso`);
    }

}

const validS = async (sexo = 'Prefiero no decirlo') => {

    const dis = [
        'Masculino',
        'Femenino',
        'Prefiero no decirlo'
    ];
    if (!dis.includes(sexo)) {
        throw new Error(`El campo sexo no admite: ${sexo}`);
    }

}

const validResidencia = async (estadoMX = 'Prefiero no decirlo') => {

    const residencia = [
        'Prefiero no decirlo',
        'No resido en el pais',
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Coahuila de Zaragoza',
        'Colima',
        'Ciudad de México',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Estado de Mexico',
        'Michoacan de Ocampo',
        'Morelos',
        'Nayarit',
        'Nuevo Leon',
        'Oaxaca',
        'Puebla',
        'Queretaro de Arteaga',
        'Quintana Roo',
        'San Luis Potosi',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz de Ignacio de la Llave',
        'Yucatan',
        'Zacatecas',
    ];
    if (!residencia.includes(estadoMX)) {
        throw new Error(`El campo de residencia no admite: ${estadoMX}`)
    }

}

module.exports = {
    existEmail,
    existUser,
    validS,
    validResidencia,
    existeUserID,
    existeAdminID
}