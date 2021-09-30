const cloudinary = require('cloudinary').v2;

const { CLOUDINARY } = require('../constants');

cloudinary.config({
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.SECRET,
});

module.exports = cloudinary;
