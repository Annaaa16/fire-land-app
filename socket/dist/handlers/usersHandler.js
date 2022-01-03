"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LISTENS = {
    ADD_ONLINE_USER: 'addOnlineUser',
    DISCONNECT: 'disconnect',
};
const EMITS = {
    RECEIVE_ONLINE_USERS: 'receiveOnlineUsers',
};
let currentSockets = {};
let onlineUsers = [];
const isOnline = (userId, socketId) => {
    return onlineUsers.some((user) => user._id === userId || user.socketId === socketId);
};
const addCurrentSocket = (userId, socketId) => {
    if (!userId)
        return;
    if (!currentSockets[userId])
        currentSockets[userId] = [];
    if (currentSockets[userId].includes(socketId))
        return;
    currentSockets[userId].push(socketId);
};
const addOnlineUser = (currentUser, socketId) => {
    if (isOnline(currentUser._id, socketId))
        return;
    onlineUsers.push(Object.assign(Object.assign({}, currentUser), { socketId }));
};
const removeCurrentSocket = (userId, socketId) => {
    if (!currentSockets[userId])
        return;
    currentSockets[userId].splice(currentSockets[userId].indexOf(socketId), 1);
};
const removeOfflineUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const usersHandler = (io, socket) => {
    const userId = socket.handshake.query.userId;
    if (!userId)
        return;
    socket.on(LISTENS.ADD_ONLINE_USER, (user) => {
        addCurrentSocket(userId, socket.id);
        if (isOnline(userId, socket.id))
            return;
        addOnlineUser(user, socket.id);
        io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
    });
    socket.on(LISTENS.DISCONNECT, () => {
        var _a;
        removeCurrentSocket(userId, socket.id);
        if (((_a = currentSockets[userId]) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            removeOfflineUser(socket.id);
            io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
            delete currentSockets[userId];
        }
        socket.disconnect();
    });
};
exports.default = usersHandler;
//# sourceMappingURL=usersHandler.js.map