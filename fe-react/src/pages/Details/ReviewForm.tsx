import React, { useState } from 'react';

interface ReviewFormProps {
  className?: string;
  userId: number;
  hidden?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = props => {
  // Define the state variables here
  const [title, setTitle] = useState<string>('');
  const [review, setReview] = useState<string>('');

  // Define the event handlers here
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  // Render the component JSX here
  return (
    <form
      className={`border-border border rounded-md p-5 ${props.className}`}
      hidden={props.hidden}
      onSubmit={handleSubmit}
    >
      <input
        className='w-full'
        type='text'
        placeholder='Title'
        id='title'
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        className='mt-4 h-48 w-full text-area resize-none '
        id='review'
        placeholder='Review'
        value={review}
        onChange={handleReviewChange}
      />
      <button type='submit' className='w-fit px-6 mt-4'>
        Send
      </button>
    </form>
  );
};

export default ReviewForm;
