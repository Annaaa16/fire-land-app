const authRoute = require('./authRoute');
const usersRoute = require('./usersRoute');
const postsRoute = require('./postsRoute');
const conversationsRoute = require('./conversationsRoute');
const messagesRoute = require('./messagesRoute');
const commentsRoute = require('./commentsRoute');
const productsRoute = require('./productsRoute');

const connectToRoutes = (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/users', usersRoute);
  app.use('/api/posts', postsRoute);
  app.use('/api/conversations', conversationsRoute);
  app.use('/api/messages', messagesRoute);
  app.use('/api/comments', commentsRoute);
  app.use('/api/products', productsRoute);
};

module.exports = connectToRoutes;
