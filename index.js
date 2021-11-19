require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

try {

    mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true
    });
    console.log('Base de datos online');

} catch (error) {
    console.log(error);
    throw new Error('Error a la hora de conectar a la BD');
}

app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/admin', require('./routes/admin'));
app.use('/ficha', require('./routes/ficha'));
app.use('/solicitud', require('./routes/solicitudes'));
app.use('/comment', require('./routes/comentarios'));

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server in port: ${process.env.PORT}`);
});
//Funciona a ele be





