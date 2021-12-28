// types
import {
  NotificationsEmits,
  NotificationsListens,
  SocketEmits,
  SocketListens,
} from '@/types/socket';

const LISTENS: NotificationsListens = {
  SEND_NOTIFICATION: 'sendNotification',
};

const EMITS: NotificationsEmits = {
  RECEIVE_NOTIFICATION: 'receiveNotification',
};

const notifications = [];

const notificationsHandler = (io: SocketEmits, socket: SocketListens) => {
  socket.on(LISTENS.SEND_NOTIFICATION, (notification) => {
    notifications.push(notification);

    io.emit(EMITS.RECEIVE_NOTIFICATION, notification);
  });
};

export default notificationsHandler;
