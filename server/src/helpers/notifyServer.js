exports.notifyServerError = (res, error) => {
  console.log('Notify server error 👉', error);
  return res
    .status(500)
    .json({ success: false, message: 'Internal server error' });
};
