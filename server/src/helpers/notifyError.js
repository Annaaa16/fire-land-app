exports.notifyServerError = (res, error) => {
  console.log('Server error 👉', error.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
};
