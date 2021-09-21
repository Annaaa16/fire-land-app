exports.notifyServerError = (res, error) => {
  console.log(error);
  return res
    .status(500)
    .json({ success: false, message: 'Internal server error' });
};
