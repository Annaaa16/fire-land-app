export const URLS = {
  API: process.env.NEXT_PUBLIC_API_URL,
  AVATAR: 'https://avatars.dicebear.com/api',
};

export const CLOUDINARY_PREFIX =
  'https://res.cloudinary.com/drxhgl7xe/image/upload';

export const LIMITS = {
  POSTS: 5,
  COMMENTS: 5,
};

export const ACCESS_TOKEN_SECRET = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;

export const COOKIES = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
};

export const LOCAL_STORAGE = {
  THEME_KEY: 'theme',
  LIGHT_THEME_VALUE: 'light',
  DARK_THEME_VALUE: 'dark',
};

export const PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  NEWSFEED: '/newsfeed',
};
