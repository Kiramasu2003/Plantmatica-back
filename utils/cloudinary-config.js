const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'tucan-s-software',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});