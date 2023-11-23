import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { getColor } from 'src/helpers/utils';
import useUserProfile from 'src/hooks/useUserProfile';
import useUserRating from 'src/hooks/useUserRating';
import UserOverview from './UserOverView';
import UserRatingPanel from './UserRatingPanel';
import UserRecomList from './UserRecomList';
import DiscussionCard from './../../components/Dicussion/DicussionCard';

const UserProfile = () => {
  const { id } = useParams();

  const { data: userProfileData, isLoading } = useUserProfile(id);

  const [avarageRating, setAvarageRating] = useState<number | undefined>(undefined);

  const { data: ratingData, isLoading: isRatingLoading } = useUserRating({
    id: id ?? '',
    onSuccess: data => {
      let totalRating = 0;
      data.forEach(element => {
        totalRating += element.rating;
      });
      console.log('totalRating', totalRating);
      setAvarageRating(totalRating / data.length);
    }
  });

  if (isLoading || isRatingLoading) {
    return <p>Loading...</p>;
  }

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
      <div className='py-3 px-24 '>
        <Tabs>
          <TabList className={'flex justify-center border-border border-b-1 react-tabs__tab-list '}>
            <Tab>Overview</Tab>
            <Tab>Ratings</Tab>
            <Tab>Recommendations</Tab>
            <Tab>Discussion</Tab>
            <Tab>Watchlist</Tab>
          </TabList>
          <TabPanel>
            <UserOverview ratingData={ratingData} favourites={[233, 3, 5, 6, 11]} />
            <UserRecomList movieIds={userProfileData.recommendation_list}></UserRecomList>
          </TabPanel>
          <TabPanel>
            <UserRatingPanel userId={id}></UserRatingPanel>
          </TabPanel>
          <TabPanel>
            <UserRecomList movieIds={userProfileData.recommendation_list}></UserRecomList>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
export default UserProfile;
