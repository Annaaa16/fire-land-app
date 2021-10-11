// socket
import io from 'socket.io-client';

const socket = io('ws://localhost:4000', {
  withCredentials: true,
});

export default socket;
