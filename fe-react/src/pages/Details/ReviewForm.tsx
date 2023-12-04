import React, { useState } from 'react';
import useUserReview from 'src/hooks/useUserReview';

interface ReviewFormProps {
  className?: string;
  userId: number;
  movieId: number;
  hidden?: boolean;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = props => {
  // Define the state variables here
  const [review, setReview] = useState<string>('');
  const { mutate: createReview } = useUserReview(props.userId, props.movieId, props.onSuccess);
  // Define the event handlers here

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createReview(review);
    // Handle form submission logic here
  };

  // Render the component JSX here
  return (
    <form
      className={`border-border border rounded-md p-5 ${props.className}`}
      hidden={props.hidden}
      onSubmit={handleSubmit}
    >
      <textarea
        className=' h-48 w-full text-area resize-none '
        id='review'
        placeholder='Review'
        value={review}
        onChange={handleReviewChange}
      />
      <button type='submit' className='primary-btn h-10 w-fit px-6 mt-4'>
        Send
      </button>
    </form>
  );
};

export default ReviewForm;
