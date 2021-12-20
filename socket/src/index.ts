import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

// types
import type { Socket } from 'socket.io';

import registerConversationsHandler from './handlers/conversationsHandler';
import registerUsersHandler from './handlers/usersHandler';

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

io.on(LISTENS.CONNECTION, (socket: Socket) => {
  registerConversationsHandler(io, socket);
  registerUsersHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT} 🍹`);
});
