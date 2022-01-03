"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LISTENS = {
    SEND_NOTIFICATION: 'sendNotification',
};
const EMITS = {
    RECEIVE_NOTIFICATION: 'receiveNotification',
};
const notifications = [];
const notificationsHandler = (io, socket) => {
    socket.on(LISTENS.SEND_NOTIFICATION, (notification) => {
        notifications.push(notification);
        io.emit(EMITS.RECEIVE_NOTIFICATION, notification);
    });
};
exports.default = notificationsHandler;
//# sourceMappingURL=notificationsHandler.js.map