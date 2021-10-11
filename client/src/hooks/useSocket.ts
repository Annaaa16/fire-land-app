import { useRef } from 'react';

// types
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import socket from '@/configs/socket';

const useSocket = () => {
  const socketRef = useRef<Socket<DefaultEventsMap>>(socket);

  return { socket: socketRef.current };
};

export default useSocket;
