import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

// types
import { SocketEmits, SocketListens } from './types/socket';

import conversationsHandler from './handlers/conversationsHandler';
import usersHandler from './handlers/usersHandler';
import notificationsHandler from './handlers/notificationsHandler';

const app = express();

// Init port
const PORT = process.env.PORT || 4000;

// Init configs
const server = http.createServer(app);
const io = new Server<SocketEmits, SocketListens>(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const LISTENS = {
  CONNECTION: 'connection',
};

io.on(LISTENS.CONNECTION, (socket: SocketListens) => {
  conversationsHandler(io, socket);
  usersHandler(io, socket);
  notificationsHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT} 🍹`);
});
