const cloudinary = require('cloudinary').v2;

exports.config = () => {
  cloudinary.config({
    cloud_name: 'pegadaian',
    api_key: '756514384644651',
    api_secret: 'N9nAKVoLZmZIQZjQXfimoEDg-Ds'
  });

}

exports.uploader = cloudinary.uploader;