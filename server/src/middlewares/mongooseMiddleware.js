const mongoose = require('mongoose');

const verifyMongooseId = (req, res, next) => {
  const id = Object.values(req.params)[0];
  const originalUrl = req.originalUrl;

  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: 'ID is required from ' + originalUrl });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid mongoose ID from ' + originalUrl,
    });
  } else {
    next();
  }
};

module.exports = verifyMongooseId;
