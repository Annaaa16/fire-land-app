"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const conversationsHandler_1 = __importDefault(require("./handlers/conversationsHandler"));
const usersHandler_1 = __importDefault(require("./handlers/usersHandler"));
const notificationsHandler_1 = __importDefault(require("./handlers/notificationsHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
const LISTENS = {
    CONNECTION: 'connection',
};
io.on(LISTENS.CONNECTION, (socket) => {
    (0, conversationsHandler_1.default)(io, socket);
    (0, usersHandler_1.default)(io, socket);
    (0, notificationsHandler_1.default)(io, socket);
});
server.listen(PORT, () => {
    console.log(`Socket started on port ${PORT} 🍹`);
});
//# sourceMappingURL=index.js.map