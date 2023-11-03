import Crew from './Crew';

interface Movie {
  id: number;
  title: string;
  releaseDate: Date;
  certification: string;
  rating: number;
  genres: string[];
  runtime: number;
  tagline?: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  productionCountries: string;
  crews?: Crew[];
}

export default Movie;
