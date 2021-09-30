const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File type is not supported', false));
  }
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter,
});

module.exports = upload;
