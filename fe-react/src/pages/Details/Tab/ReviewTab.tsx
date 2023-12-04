import React, { useState } from 'react';
import ReviewCard from 'src/components/ReviewCard/ReviewCard';
import ReviewForm from '../ReviewForm';
import { useQuery } from 'react-query';
import { getMovieReview } from 'src/helpers/api';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Review from 'src/types/Review';

type ReviewTabProps = {
  movieId: number;
  userId: number;
};

export default function ReviewTab({ movieId, userId }: ReviewTabProps) {
  const [toggleReview, setToggleReview] = useState(false);
  const handleToggleReview = () => {
    setToggleReview(!toggleReview);
  };
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    refetch
  } = useQuery(['movie-review', movieId], () => getMovieReview(movieId.toString()), {
    retry: false
  });
  if (isReviewLoading) return <LoadingIndicator />;
  return (
    <>
      <div className='border-border border-b-1'>
        {!reviewData && (
          <p className='mb-3'>
            We don&apos;t have any reviews for this movie. Would you like to write one?
          </p>
        )}
        {reviewData && (
          <>
            {reviewData.map((review: Review) => {
              return (
                <ReviewCard
                  key={review.user_id}
                  avatar={review.picture_profile}
                  content={review.comment}
                  reviewTime='24.08.2018, 17:53'
                  title={`A review by ${review.username}`}
                  username={review.username}
                />
              );
            })}
            <a className='hover:opacity-70' href='reviews'>
              <h3 className='font-semibold my-5'>Read All Reviews</h3>
            </a>
          </>
        )}
      </div>
      <ReviewForm
        hidden={!toggleReview}
        className='mt-4'
        userId={userId}
        movieId={movieId}
        onSuccess={refetch}
      />
      <button
        className='font-semibold text-primary w-fit border-none hover:bg-transparent h-fit text-base normal-case my-3 hover:opacity-70'
        onClick={handleToggleReview}
      >
        {toggleReview ? 'Cancel' : 'Write a Review'}
      </button>
    </>
  );
}
