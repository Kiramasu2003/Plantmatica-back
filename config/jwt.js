const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    
    return new Promise((resolve, reject) => {
        
        const payLoad = { uid };
        
        jwt.sign(payLoad, process.env.SECRETORPUBLICKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
            
        })

    });
    
}

const getToken = (payload) => {
    return jwt.sign({
        data: payload
    }, 'SECRET', { expiresIn: '4h' });
}

const getTokenData = (token) => {

    let data = null;
    jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) {
            console.log(`Error al conseguir data token`)
        }
    });

    return data;

}

module.exports = {
    getToken,
    getTokenData,
    generarJWT
}