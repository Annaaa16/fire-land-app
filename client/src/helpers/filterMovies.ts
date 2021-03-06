// types
import { Movie, TvShow } from '@/models/common';
import { TmdbMovie, TmdbTvShow } from '@/models/tmdb';
import { MoviesDetailProps } from '@/pages/movies/[id]';

export const filterMovies = (movies: TmdbMovie[]): Movie[] => {
  return movies.map((movie) => {
    const {
      id,
      backdrop_path,
      overview,
      title,
      vote_count,
      release_date,
      popularity,
      original_language,
      vote_average,
    } = movie;

    return {
      id: id.toString(),
      image: backdrop_path,
      overview,
      title,
      voteCount: vote_count,
      releaseDate: release_date || '',
      popularity,
      originalLanguage: original_language,
      voteAverage: vote_average,
    };
  });
};

export const filterTvShows = (tvShows: TmdbTvShow[]): TvShow[] => {
  return tvShows.map((show) => {
    const {
      id,
      backdrop_path,
      overview,
      name,
      vote_count,
      first_air_date,
      popularity,
      original_language,
      vote_average,
    } = show;

    return {
      id: id.toString(),
      image: backdrop_path,
      overview,
      title: name,
      voteCount: vote_count,
      releaseDate: first_air_date || '',
      popularity,
      originalLanguage: original_language,
      voteAverage: vote_average,
    };
  });
};

export const filterMovieDetail = ({ movieDetail }: MoviesDetailProps) => {
  const { casts, detail, videos } = movieDetail;

  const { id, overview, title, backdrop_path, genres } = detail;

  const filteredCasts = casts.cast.map((cast) => ({
    id: cast.id.toString(),
    name: cast.name,
    image: cast.profile_path,
  }));

  const filteredVideos = videos.results.map((video) => ({
    id: video.id.toString(),
    name: video.name,
    path: video.key,
  }));

  const filteredGenres = genres.map((genre) => ({
    id: genre.id.toString(),
    name: genre.name,
  }));

  return {
    id: id.toString(),
    title,
    overview,
    image: backdrop_path,
    casts: filteredCasts,
    videos: filteredVideos,
    genres: filteredGenres,
  };
};
