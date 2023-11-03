import Crew from 'src/types/Crew';

export const getColor = (rating: number | undefined) => {
  if (rating === undefined) return 'border-gray-400';
  if (rating >= 8) return 'border-green-600';
  if (rating >= 6) return 'border-primary'; // Assuming 'border-primary' is a valid CSS class name.
  return 'border-red-600';
};
export function mapJsonToCrews(jsonData: any): Crew[] {
  return jsonData.map((crew: string) => {
    const validJsonString = crew.replace('None', 'null').replace(/'/g, '"');
    console.log(validJsonString);

    const crewData = JSON.parse(validJsonString);
    return {
      id: crewData.id,
      name: crewData.name,
      job: crewData.job
    };
  });
}
export function mapJsonToMovie(jsonData: any): Movie {
  return {
    id: jsonData.id,
    title: jsonData.title,
    releaseDate: new Date(jsonData.release_date),
    rating: jsonData.vote_average,
    genres: jsonData.genres.map(genre => genre.name),
    productionCountries: jsonData.production_countries
      .map(country => country.iso_3166_1)
      .join(', '),
    posterPath: jsonData.poster_path,
    backdropPath: jsonData.backdrop_path,
    runtime: minutesToHourMinuteString(jsonData.runtime),
    tagline: jsonData.tagline,
    overview: jsonData.overview
  };
}
export function formatDateToDDMMYYYY(date: Date): string {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function buildImageUrl(imagePath: string, size: string): string {
  const baseURL = 'https://image.tmdb.org/t/p/';
  const validSizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'];

  if (validSizes.includes(size)) {
    imagePath = imagePath.replace(/^\//, '');

    const imageUrl = `${baseURL}${size}/${imagePath}`;
    return imageUrl;
  } else {
    throw new Error('Invalid image size');
  }
}

function minutesToHourMinuteString(minutes: number): string {
  if (minutes < 0) {
    throw new Error('Input must be a non-negative number of minutes.');
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourString = hours > 0 ? `${hours}h` : '';
  const minuteString = remainingMinutes > 0 ? `${remainingMinutes}m` : '';

  if (hourString && minuteString) {
    return `${hourString} ${minuteString}`;
  } else {
    return hourString || minuteString || '0 minutes'; // Return "0 minutes" if both are zero.
  }
}

// "backdrop_sizes": [
//     "w300",
//     "w780",
//     "w1280",
//     "original"
//   ],
//   "logo_sizes": [
//     "w45",
//     "w92",
//     "w154",
//     "w185",
//     "w300",
//     "w500",
//     "original"
//   ],
//   "poster_sizes": [
//     "w92",
//     "w154",
//     "w185",
//     "w342",
//     "w500",
//     "w780",
//     "original"
//   ],
//   "profile_sizes": [
//     "w45",
//     "w185",
//     "h632",
//     "original"
//   ],
//   "still_sizes": [
//     "w92",
//     "w185",
//     "w300",
//     "original"
//   ]
// },
