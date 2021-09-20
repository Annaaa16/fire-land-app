import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

// Init configs
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Init port
const PORT = process.env.PORT || 4000;

app.use(cors());

io.on('connection', (socket) => {
  console.log('A user has connected 😍');

  socket.on('disconnect', (socket) => {
    console.log('User has left... 😭');
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
