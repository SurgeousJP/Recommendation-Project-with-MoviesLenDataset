import React from 'react';
import { useEffect, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { getColor } from 'src/helpers/utils';
import useUserProfile from 'src/hooks/useUserProfile';
import useUserRating from 'src/hooks/useUserRating';
type RatingData = {
  rate: string;
  rateCount: number;
};

type Series = {
  label: string;
  data: RatingData[];
};
function countRatings(ratings: any): RatingData[] {
  const countMap: { [key: string]: number } = {};

  // Initialize countMap with default counts for ratings from 0 to 10
  for (let i = 0; i <= 10; i++) {
    countMap[i.toString()] = 0;
  }

  // Count the ratings
  for (const { rating } of ratings) {
    const key = rating.toString();
    countMap[key] += 1;
  }

  // Convert the countMap to the desired format
  const result: RatingData[] = Object.entries(countMap).map(([rate, rateCount]) => ({
    rate,
    rateCount
  }));

  return result;
}

const UserProfile = () => {
  const { id } = useParams();

  const { data: userProfileData, isLoading } = useUserProfile(id);

  const [avarageRating, setAvarageRating] = useState<number | undefined>(undefined);

  const { data: ratingData, isLoading: isRatingLoading } = useUserRating({
    id: id ?? '',
    onSuccess: () => {
      let totalRating = 0;
      ratingData?.forEach(element => {
        totalRating += element.rating;
      });
      setAvarageRating(totalRating / ratingData?.length);
    }
  });

  const primaryAxis = React.useMemo(
    (): AxisOptions<RatingData> => ({
      getValue: datum => datum.rate
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RatingData>[] => [
      {
        getValue: datum => datum.rateCount,
        elementType: 'bar'
      }
    ],
    []
  );

  if (isLoading || isRatingLoading) {
    return <p>Loading...</p>;
  }
  const data: Series[] = [
    {
      label: 'Ratings',
      data: countRatings(ratingData)
    }
  ];
  return (
    <div>
      <div className='relative md:h-96 lg:h-[25rem] flex justify-center items-center lg:px-24 '>
        <div className='md:h-96 lg:h-full w-full overflow-hidden absolute left-0 top-0 '>
          <img
            src='/src/assets/images/bg.png'
            className='w-full h-full object-cover object-bottom'
            alt='backdrop'
          ></img>
        </div>
        <div className='relative flex w-full lg:scale-100 scale-75 items-center'>
          <img
            className='rounded-full overflow-hidden'
            src={userProfileData.picture_profile}
            alt='user profile'
          />
          <div className='ml-4'>
            <span className='text-3xl font-bold'>{userProfileData.username}</span>
            <span className='text-lg text-white/70 ml-2'> Member since October 2023</span>
            <div className='flex items-center mt-5'>
              <span
                className={`text-xl font-semibold text-white flex justify-center items-center w-16 h-16 border-[3.5px] rounded-full bg-background/60 ${getColor(
                  avarageRating
                )}`}
              >
                {avarageRating === undefined ? 'NR' : avarageRating.toFixed(1).toString()}
              </span>
              <span className='ml-5 leading-tight'>
                Average <br></br> Movie Score
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-3'>
        <Tabs>
          <TabList className={'flex justify-center border-border border-b-1 react-tabs__tab-list '}>
            <Tab>Overview</Tab>
            <Tab>Discussions</Tab>
            <Tab>Lists</Tab>
            <Tab>Ratings</Tab>
            <Tab>Watchlist</Tab>
          </TabList>
          <TabPanel>
            <div className='px-24 mt-3'>
              <h2 className='text-2xl font-bold'>Stats</h2>
              <div className='flex justify-between'>
                <div>
                  <p className='text-lg'>Total Rating</p>
                  <p className='text-[4rem] font-bold'>{ratingData?.length}</p>
                </div>
                <div>
                  <p className='text-lg'>Total Reviews</p>
                  <p className='text-[4rem] font-bold'>{ratingData?.length}</p>
                </div>
                <div className='w-1/3'>
                  <p className='text-lg'>Total Reviews</p>
                  <Chart
                    options={{
                      data: data,
                      primaryAxis: primaryAxis,
                      secondaryAxes: secondaryAxes,
                      dark: true
                    }}
                  />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
export default UserProfile;
