const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const registerConversationsHandler = require('./handlers/conversationsHandler');
const registerUsersHandler = require('./handlers/usersHandler');

const app = express();

// Init port
const PORT = process.env.PORT || 4000;

// Init configs
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const LISTENS = {
  CONNECTION: 'connection',
};

io.on(LISTENS.CONNECTION, (socket) => {
  registerConversationsHandler(io, socket);
  registerUsersHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT} 🍹`);
});
