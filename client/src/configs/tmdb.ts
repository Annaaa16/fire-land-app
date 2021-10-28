import { API_URLS, TMDB } from '../constants';

const tmdb = {
  baseUrl: API_URLS.TMDB,
  apiKey: TMDB.API_KEY,
  originalImage: (imgPath: string) => `${TMDB.IMAGE}/original/${imgPath}`,
  w500Image: (imgPath: string) => `${TMDB.IMAGE}/w500/${imgPath}`,
};

export default tmdb;
