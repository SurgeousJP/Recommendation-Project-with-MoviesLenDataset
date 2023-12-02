import React from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { useQueries, useQuery } from 'react-query';
import LoadingIndicator from 'src/components/LoadingIndicator';
import MovieCardUser from 'src/components/MovieCardUser';
import { getMovieDetail, getUserRating } from 'src/helpers/api';
import { buildImageUrl } from 'src/helpers/utils';
import MovieList from './MovieList';

export type Series = {
  label: string;
  data: RatingData[];
};

interface UserRatingPanelProps {
  userId: string;
  favoriteList?: number[];
}
type RatingData = {
  rateCount: number;
  year: string;
};
type RatingRawData = {
  movie_id: string;
  rating: number;
  year: number;
};

function countRatings(ratings: RatingRawData[]): RatingData[] {
  const countMap: { [key: string]: number } = {};
  let minYear = Math.min(...ratings.map(rating => rating.year));
  const maxYear = Math.max(...ratings.map(rating => rating.year));

  if (minYear === maxYear) {
    minYear = minYear - 1;
  }

  // Initialize countMap with default counts for ratings from 0 to 10
  for (let i = minYear; i <= maxYear; i++) {
    countMap[i.toString()] = 0;
  }

  // Count the ratings
  for (const { year } of ratings) {
    const key = year.toString();
    countMap[key] += 1;
  }

  // Convert the countMap to the desired format
  const result: RatingData[] = Object.entries(countMap).map(([year, rateCount]) => ({
    year,
    rateCount
  }));

  return result;
}

const UserRatingPanel = ({ userId, favoriteList }: UserRatingPanelProps) => {
  const { data: ratingData } = useQuery(['userRating', userId], () => getUserRating(userId), {
    select: (data): RatingRawData[] => {
      return data.map(rating => {
        return {
          rating: rating.rating,
          movie_id: rating.movie_id,
          year: new Date(rating.timestamp * 1000).getFullYear()
        };
      });
    }
  });
  const primaryAxis = React.useMemo(
    (): AxisOptions<RatingData> => ({
      position: 'bottom',
      getValue: datum => datum.year,
      shouldNice: true
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RatingData>[] => [
      {
        getValue: datum => datum.rateCount,
        elementType: 'area',
        shouldNice: false
      }
    ],
    []
  );
  const data: Series[] = [
    {
      label: 'Ratings',
      data: countRatings(ratingData ?? [])
    }
  ];
  console.log('data', data);
  const movieIds = ratingData?.map(rating => rating.movie_id) ?? [];

  const movieQueries = useQueries(
    movieIds.map(movieId => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetail(movieId.toString())
      };
    })
  );

  const isLoading = movieQueries.some(result => result.isLoading);

  console.log('years', ratingData);

  return (
    <div className='mt-3'>
      <h2 className='text-2xl font-bold'>Rating By Year</h2>
      <div className='w-full h-24'>
        <Chart
          options={{
            data: data,
            primaryAxis: primaryAxis,
            secondaryAxes: secondaryAxes,
            dark: true
          }}
        />
      </div>
      <MovieList
        movieIds={ratingData?.map(rating => parseInt(rating.movie_id)) ?? []}
        nullListMessage={`You haven't rate any movie yet`}
        title='My Ratings'
        canRemove
        favoriteList={favoriteList}
      />
    </div>
  );
};

export default UserRatingPanel;
