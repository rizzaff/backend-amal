const cloudinary = require('cloudinary').v2;

exports.config = () => {
  cloudinary.config({
    cloud_name: 'pegadaian',
    api_key: '756514384644651',
    api_secret: 'N9nAKVoLZmZIQZjQXfimoEDg-Ds'
//new
    // cloud_name: 'dcpyiwaet',
    // api_key: '683555545317525',
    // api_secret: 'jr4_Ufx6RLEK-3C2rKaWhnd6L0I'
});

}

exports.uploader = cloudinary.uploader;