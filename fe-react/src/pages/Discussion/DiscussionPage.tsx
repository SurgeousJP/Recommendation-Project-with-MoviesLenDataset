import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DiscussionPartCard from 'src/components/Discussion/DiscussionPartCard';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { createDiscussionPart, getDiscussion } from 'src/helpers/api';
import DiscussionPart from 'src/types/DiscussionPart.type';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useUserId from 'src/hooks/useUserId';

interface DiscussionProps {
  movieTitle: string;
}

function DiscussionPage({ movieTitle }: DiscussionProps) {
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { hasLogin, userId } = useUserId();

  const { mutate: addDiscussionPart } = useMutation((discussionPart: DiscussionPart) =>
    createDiscussionPart(id, discussionPart)
  );
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = () => {
    console.log(value);
    addDiscussionPart({
      description: value,
      discussion_id: id,
      user_id: userId
    });
  };
  const { data: discussion, isLoading } = useQuery(['discussion', id], () => getDiscussion(id));
  if (isLoading) return <LoadingIndicator />;
  return (
    <div className='w-full p-8'>
      <h2>Discuss {movieTitle}</h2>
      {discussion.discussion_part.map((part: DiscussionPart, index: number) => {
        if (index === 0) {
          return (
            <DiscussionPartCard key={index} discussionPart={part} subject={discussion.subject} />
          );
        } else {
          return (
            <DiscussionPartCard
              key={index}
              discussionPart={part}
              subject={discussion.subject}
              isReply={true}
            />
          );
        }
      })}
      <div hidden={!isOpen}>
        <ReactQuill theme='snow' value={value} onChange={setValue} />
      </div>
      {!isOpen && (
        <button
          onClick={toggleOpen}
          hidden={!hasLogin}
          className='font-semibold mt-8 mr-10 bg-[#01b4e4] rounded-md px-4 py-1.5 hover:bg-opacity-0 hover:text-[#01b4e4] hover:underline transition duration-300'
        >
          Reply
        </button>
      )}
      {isOpen && (
        <>
          <button
            onClick={handleSubmit}
            hidden={!hasLogin}
            className='font-semibold mt-8 mr-10 bg-[#01b4e4] rounded-md px-4 py-1.5 hover:bg-opacity-0 hover:text-[#01b4e4] hover:underline transition duration-300'
          >
            Submit
          </button>
          <button onClick={toggleOpen} hidden={!hasLogin} className='hover:underline'>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default DiscussionPage;
