"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = __importDefault(require("../helpers/time"));
const LISTENS = {
    SEND_MESSAGE: 'sendMessage',
    JOIN_CONVERSATION: 'joinConversation',
    LEAVE_CONVERSATION: 'leaveConversation',
    DISCONNECT: 'disconnect',
};
const EMITS = {
    RECEIVE_MESSAGE: 'receiveMessage',
};
let users = [];
const joinConversation = ({ user: currentUser, conversationId, socketId, }) => {
    if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser._id) || !conversationId)
        return;
    const isJoined = users.some((user) => user._id === currentUser._id || user.socketId === socketId);
    if (!isJoined)
        users.push(Object.assign(Object.assign({}, currentUser), { conversationId, socketId }));
};
const leaveConversation = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getCurrentUser = (socketId) => {
    return users.find((user) => user.socketId === socketId);
};
const conversationsHandler = (io, socket) => {
    socket.on(LISTENS.JOIN_CONVERSATION, ({ user, conversationId }) => {
        joinConversation({ user, conversationId, socketId: socket.id });
        socket.join(conversationId);
    });
    socket.on(LISTENS.SEND_MESSAGE, (text) => {
        const sender = getCurrentUser(socket.id);
        if (!sender)
            return;
        io.to(sender.conversationId).emit(EMITS.RECEIVE_MESSAGE, {
            user: sender,
            text,
            createdAt: time_1.default.createCreatedAt(),
        });
    });
    socket.on(LISTENS.LEAVE_CONVERSATION, () => {
        leaveConversation(socket.id);
    });
    socket.on(LISTENS.DISCONNECT, () => {
        leaveConversation(socket.id);
    });
};
exports.default = conversationsHandler;
//# sourceMappingURL=conversationsHandler.js.map