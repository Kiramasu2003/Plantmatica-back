//FUNCIONALIDADES DE FICHAS RELACIONADO A LOS USUARIOS
const Ficha = require('../models/FichaPlanta');
const Etiqueta = require('../models/Etiquetas');
const User = require('../models/User');
//const cloudinary = require('cloudinary').v2;// .v2 =version 2
const { response } = require('express');
/*
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

/*const cargarArchivo = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ msg: "err" });
        }

        res.json({ msg: 'File uploaded to ' + uploadPath })
    });
}*

const actualizarImg = async (req, res) => {

    const { id } = req.params;

    let arrayImg = [];
    try {
        //ficha.imagenes

        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        console.log(secure_url);
        arrayImg.push(secure_url);


        Ficha.imagenes = arrayImg;
        await Ficha.findByIdAndUpdate(id, {
            $push: {
                'imagenes': arrayImg

            }
        })

        res.json({
            msg: 'img agregada correctamente'
        });
    } catch (error) {
        res.json({
            msg: 'img no fue agregada, hay un error',
            err: error.msg
        })
    }
}*/

const crearFicha = async (req, res) => {

    let {
        //imagenes,
        etiquetas,
        nombre_comun,
        nombre_cientifico,
        origen_distribucion,
        descripcion,
        complemento,
        usos_medicinales,
        consumo,
        fuentes,
        usuario_creo,
        caracteristicas_especiales,
        polemica
    } = req.body;
    /*
    let arrayImg = [];
    //Crear las etiquetas y guardarlas en la bd
    guardarEtiquetasBD(etiquetas, nombre_comun, nombre_cientifico);

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    console.log(secure_url);
    arrayImg.push(secure_url);


    Ficha.imagenes = arrayImg;
    await Ficha.findByIdAndUpdate(id, {
        $push: {
            'imagenes': arrayImg

        }
    })*/


    const ficha = new Ficha({
        imagenes,
        etiquetas,
        nombre_comun,
        nombre_cientifico,
        complemento,
        origen_distribucion,
        descripcion,
        usos_medicinales,
        consumo,
        fuentes,
        datos_creacion: { usuario_creo },
        caracteristicas_especiales,
        polemica
    });

    const fichaAgregada = await ficha.save();

    res.json({
        msg: 'Ficha creadas correctamente',
        fichaAgregada
    });

}


//Crear las etiquetas y guardarlas en la bd
const guardarEtiquetasBD = async (etiquetas, nombreCo, nombreCien) => {

    let etiquetaFor;
    let existenciaEtiqueta;



    etiquetas.push(nombreCo);
    etiquetas.push(nombreCien)
    etiquetas.forEach(async e => {

        //Verifica la existencia de la etiqueta
        existenciaEtiqueta = await Etiqueta.findOne({ etiqueta: e });
        //Si las etiquetas no estan registradas previamente se agrega
        if (!existenciaEtiqueta) {
            etiquetaFor = new Etiqueta({ etiqueta: e });
            await etiquetaFor.save();
        }

    });

    return etiquetas;

}

//Conseguir una ficha por su ID de mongoose
const getFichaId = async (req, res) => {

    const { id } = req.params;
    const ficha = await Ficha.findById(id);

    res.json({
        ficha
    })

}

//Conseguir las fichas ya aceptadas por algun administrador
const conseguirTodasLasFichas = async (req, res) => {

    const [total, fichas] = await Promise.all([
        Ficha.countDocuments({ "estado_ficha.state": true }),
        Ficha.find({ "estado_ficha.state": true })
    ])

    res.json({
        total,
        fichas
    });

}

/* Conseguir solicitudes para agregar ficha agregadas y no agregadas por un usuario */
const conseguirFichasDeUsuario = async (req, res) => {

    const { id } = req.params;
    //const fichas = await Ficha.find({ "datos_creacion.usuario_creo": id  });
    const [total, fichas] = await Promise.all([
        Ficha.countDocuments({ "datos_creacion.usuario_creo": id }),
        Ficha.find({ "datos_creacion.usuario_creo": id })
    ])

    res.json({
        total,
        fichas
    })

}

const guardarFicha = async (req, res) => {

    const { id } = req.params;
    const { id_user } = req.body;

    await User.findByIdAndUpdate(id_user, {
        $addToSet: {
            'fichas_guardadas': id
        }
    });

    res.json({
        msg: 'La ficha se guardo exitosamente'
    });

}

const conseguirFichasGuardadasUsuario = async (req, res) => {

    const { id_user } = req.params;

    const fichas_guardadas = await User.findById(id_user).populate('fichas_guardadas');

    res.json({
        fichas_guardadas
    })

}

const eliminarFichaGuardada = async (req, res) => {

    const { id } = req.params;
    const { id_user } = req.body;

    await User.findByIdAndUpdate(id_user, {
        $pull: {
            'fichas_guardadas': id
        }
    });

    res.json({
        msg: 'Se a eliminado correctamente la ficha de tus guardados.'
    });

}

module.exports = {
    crearFicha,
    conseguirTodasLasFichas,
    getFichaId,
    guardarEtiquetasBD,
    conseguirFichasDeUsuario,
    guardarFicha,
    eliminarFichaGuardada,
    conseguirFichasGuardadasUsuario,
    //actualizarImg,
    //cargarArchivo
}