const authRoute = require('./authRoute');
const postsRoute = require('./postsRoute');
const conversationsRoute = require('./conversationsRoute');
const messagesRoute = require('./messagesRoute');

const connectToRoutes = (app) => {
  app.use('/api/auth', authRoute);
  app.use('/api/posts', postsRoute);
  app.use('/api/conversations', conversationsRoute);
  app.use('/api/messages', messagesRoute);
};

module.exports = connectToRoutes;
