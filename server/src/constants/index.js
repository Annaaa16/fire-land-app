exports.LIMIT_UPLOAD = '5mb';

exports.ACCESS_TOKEN_EXP = 30000;

exports.MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@fire-chat-app-global-se.y50eq.mongodb.net/fire-chat-app-global-server?retryWrites=true&w=majority`;

exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
