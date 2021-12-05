const verifyQueries = (req, res, next) => {
  const { page, limit } = req.query;

  if (!page) {
    return res
      .status(400)
      .json({ success: false, message: 'Page query is required' });
  }

  if (!limit) {
    return res
      .status(400)
      .json({ success: false, message: 'Limit query is required' });
  }

  next();
};

module.exports = verifyQueries;
