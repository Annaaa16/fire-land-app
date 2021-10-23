exports.notifyServerError = (res, error) => {
  console.log('Server error 👉', error);
  res.status(500).json({ success: false, message: 'Internal server error' });
};
