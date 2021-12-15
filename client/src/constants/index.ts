export * from './socket';

export const API_URLS = {
  BASE: 'http://localhost:5000/api',
  SOCKET: 'http://localhost:4000',
  TMDB: 'https://api.themoviedb.org/3',
  AVATAR: 'https://avatars.dicebear.com/api',
  CLOUDINARY: 'https://res.cloudinary.com/drxhgl7xe/image/upload',
};

export const TMDB = {
  API_KEY: '0f36693825733051b8551c9e5b42c008',
  IMAGE: 'https://image.tmdb.org/t/p',
};

export const COOKIES = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  PREV_PATH_KEY: 'prev_path',
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
  MOVIES: '/movies',
  MOVIES_SEARCH: '/movies/search',
  WALL: '/wall',
};

export const LIMITS = {
  POSTS: 5,
  COMMENTS: 5,
  PRODUCTS: 5,
  REVIEWS: 5,
};

export const BREAKPOINTS = {
  PHONE: 0,
  TABLET: 768,
  DESKTOP: 1440,
};

export const COLORS = {
  LIGHT_BODY: '#f7f7fa',
  DARK_BODY: '#161b28',
};

export const DELAYS = {
  DEFAULT: 300,
  DOUBLE: 600,
};

export const STATUS_CODES = {
  DEFAULT: 0,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const PREFIXES = {
  YOUTUBE_EMBED: 'https://www.youtube.com/embed',
  BASE64_SVG: 'data:image/svg+xml;base64,',
};

export const BACKUPS = {
  AVATAR: 'https://avatars.dicebear.com/api/micah/uiSvbW.svg',
};
