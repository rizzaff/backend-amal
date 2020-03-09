'use strict';

// const response = require('./res');

const multer = require('multer')
const cloudinary = require('./cloudinaryConfig');
const dataUri = require('./multer').dataUri;
const multerUploads = require('./multer').multerUploads;
  
exports.uploadDokumen =(req, res, next) => {
    multerUploads(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      cloudinary.config();  
      const file = dataUri(req).content;
  
      cloudinary.uploader.upload(file, function(error, result) {console.log(error)}).then(result => {
        const image = result.url;
        res.json(image)
    })
    })
  }