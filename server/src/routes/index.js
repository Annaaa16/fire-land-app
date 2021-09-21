const authRoute = require('./authRoute');

const connectToRoutes = (app) => {
  app.use('/api/auth', authRoute);
};

module.exports = connectToRoutes;
