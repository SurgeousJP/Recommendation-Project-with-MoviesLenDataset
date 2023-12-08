import React from 'react';
import Discussion from './../../types/Discussion.type';

interface DiscussionFormProps {
  movieId: number;
  movieTitle: string;
  userId: number;
}

function DiscussionForm({ movieId, movieTitle, userId }: DiscussionFormProps) {
  return (
    <div>
      <h2>Discuss {movieTitle}</h2>
      <h3>For Item</h3>
      <p>{movieTitle}</p>
      <div>
        <label htmlFor='subject'>Subject</label>
        <input></input>
      </div>
      <div>
        <label htmlFor='subject'>Message</label>
        <input></input>
      </div>
    </div>
  );
}

export default DiscussionForm;
