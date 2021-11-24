const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6cad4d812a71f0",
        pass: "c7abfe74389d0a"
    }
});

const sendEmail = async (email, subject, html) => {
    try {

        await transporter.sendMail({
            from: `Tucan's Software <${process.env.CORREO_TEST}>`,
            to: email,
            subject,
            text: `Correo de verificacion al crear cuenta en Plantmatica`,
            html
        });

    } catch (error) {
        console.log('No va bien - Email', error);
    }
}

const getTemplate = (nombre, token) => {
    return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>

        <div id="email___content">
            <img src="https://i.imgur.com/eboNR82.png" alt="">
            <h2>Hola ${nombre}</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:4000/api/user/confirm/${token}"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
    `
}

module.exports = {
    getTemplate,
    sendEmail
}