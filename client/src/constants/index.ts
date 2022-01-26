export const API_URLS = {
  BASE:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:5000/api',

  SOCKET:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SOCKET_URL
      : 'http://localhost:4000',

  NEXT: '/api',
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
  PEOPLE_SEARCH: '/people/search',
  MARKETPLACE: '/marketplace',
  MARKETPLACE_PRODUCTS: '/marketplace/products',
  WALL: '/wall',
  MESSENGER: '/messenger',
  NOT_FOUND: '/notfound',
};

export const LIMITS = {
  POSTS: 5,
  COMMENTS: 5,
  PRODUCTS: 15,
  REVIEWS: 5,
  SEARCH_PEOPLE: 10,
};

export const BREAKPOINTS = {
  PHONE: 0,
  TABLET: 768,
  DESKTOP: 1440,
};

export const DELAYS = {
  DEFAULT: 300,
  DOUBLE: 600,
};

export const PREFIXES = {
  YOUTUBE_EMBED: 'https://www.youtube.com/embed',
  BASE64_SVG: 'data:image/svg+xml;base64,',
};

export const BACKUPS = {
  AVATAR: API_URLS.AVATAR + '/micah/uiSvbW.svg',
};
