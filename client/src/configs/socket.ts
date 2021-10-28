import { API_URLS } from '../constants';

// socket
import io from 'socket.io-client';

const socket = io(API_URLS.SOCKET, {
  withCredentials: true,
});

export default socket;
