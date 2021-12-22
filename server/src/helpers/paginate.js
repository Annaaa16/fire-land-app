const paginate = (req, total) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  const prevPage = startIdx > 0 ? page - 1 : null;
  const nextPage = endIdx < total ? page + 1 : null;

  return { skip: startIdx, limit, prevPage, nextPage };
};

module.exports = paginate;
