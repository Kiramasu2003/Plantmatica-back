const Etiqueta = require('../models/Etiquetas');
const Ficha = require('../models/FichaPlanta');

const getEtiquetas = async (req, res) => {

    const etiquetas = await Etiqueta.find();
    let arrayEtiquetas = [];
    let object;
    etiquetas.forEach(e => {
        if (e.estadoEti === true) {
            object = new Object({
                etiqueta: e.etiqueta
            });
            arrayEtiquetas.push(object);
        }
    });

    res.json({
        arrayEtiquetas
    });

}

const buscarCoincidencias = async (req, res)=> {

    const { termino } = req.body;

    const fichas = await Ficha.find({ etiquetas: { $regex : termino, $options: 'i' } })

    res.json({
        fichas,
        termino
    })

}

module.exports = {
    getEtiquetas,
    buscarCoincidencias
}