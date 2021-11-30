exports.LIMIT_UPLOAD = '5mb';

exports.MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@fire-chat-app-global-se.y50eq.mongodb.net/fire-chat-app-global-server?retryWrites=true&w=majority`;

exports.TOKENS = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXP: 7 * 24 * 60 * 60, // 7 days (by seconds)
  REFRESH_TOKEN_EXP: 14 * 24 * 60 * 60, // 14 days (by seconds)
};

exports.COOKIES = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
};

exports.CLOUDINARY = {
  NAME: 'drxhgl7xe',
  API_KEY: process.env.CLOUDINARY_API_KEY,
  SECRET: process.env.CLOUDINARY_SECRET,
  POSTS_UPLOAD_PATH: 'fire-chat-app/posts',
  PRODUCTS_UPLOAD_PATH: 'fire-chat-app/products',
};
