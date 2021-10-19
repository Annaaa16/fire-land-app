export const URLS = {
  API: process.env.NEXT_PUBLIC_API_URL,
  AVATAR: 'https://avatars.dicebear.com/api',
};

export const CLOUDINARY_PREFIX =
  'https://res.cloudinary.com/drxhgl7xe/image/upload';

export const LIMIT_POSTS = 5;

export const ACCESS_TOKEN_SECRET = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  NEWSFEED: '/newsfeed',
};
