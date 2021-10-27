import { URLS } from '../constants';

// socket
import io from 'socket.io-client';

const socket = io(URLS.SOCKET_API, {
  withCredentials: true,
});

export default socket;
