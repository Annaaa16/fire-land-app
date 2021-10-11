const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

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

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUSer = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('A user has connected 😍');

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);

    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const receiver = getUSer(receiverId);

    if (receiver) {
      io.to(receiver?.socketId).emit('getMessage', {
        senderId,
        text,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected 😭');

    removeUser(socket.id);

    io.emit('getUsers', users);
  });
});

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT} 🍹`);
});
