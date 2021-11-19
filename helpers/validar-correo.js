"use strict";
const nodemap = require('nodemailer');

//el medio por donde vamos a enviar el correo, ósea nuestro correo
export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Verdadero para port 465, falso para otros ports
    auth: {
        user: process.env.CORREO_EMPRESA, // correo
        pass: process.env.PASS, //contraseña
    },
});

transport.verify().then(() => {
    console.log('Listo para enviar correo')
});

const messages = {
    from: process.env.CORREO_EMPRESA,
    //to: user.email,
    to: process.env.CORREO_ARCE,
    subject: "Prueba correo",
    text: "Hola Mundo",
    html: "<p>Versión HTML del correo</p>"
};