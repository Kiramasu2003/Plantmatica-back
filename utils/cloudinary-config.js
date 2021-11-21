const cloudinary = require('cloudinary').v2;// .v2 =version 2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

/**
 Esto debe de ir en el front, es para obtener la img y subirla
 El widget para funcionar, necesita estar en un server localhost


const boton_foto = document.querySelector('#foto');
const imagen = document.querySelector('#imagen');

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName : process.env.CLOUD_NAME,
    uploadPreset: process.env.CLOUD_PRESET,
}, (error, result)=>{
    if(!error && result && ressult.event ==='success'){
        console.log("img subida con exito ", result.info);
        imagen.src = result.info.secure_url;
    }

});

boton_foto.addEventListener('click', ()=>{
    widget_cloudinary.open();
}, false);
*/
