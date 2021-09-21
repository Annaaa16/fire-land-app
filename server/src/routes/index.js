const authRoute = require('./authRoute');
const postsRoute = require('./postsRoute');

const connectToRoutes = (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/posts', postsRoute);
};

module.exports = connectToRoutes;
