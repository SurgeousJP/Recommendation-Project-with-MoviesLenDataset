import React from 'react';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table';
import { options } from 'src/constant/time-option';
import { getDiscussionByPage } from 'src/helpers/api';
import { buildImageUrl } from 'src/helpers/utils';
import useMovieDetail from 'src/hooks/useMovieDetail';

interface DiscussionSubjectProps {
  movie_id: string;
  subject: string;
  discussion_id: string;
  user_id: string;
  profile_path: string;
}
function DiscussionSubject({
  movie_id,
  subject,
  profile_path,
  discussion_id,
  user_id
}: DiscussionSubjectProps) {
  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(movie_id);
  return (
    <div>
      <div className='flex items-center'>
        <Link to={`/u/${user_id}`}>
          <img className='w-10 h-10 mr-4 rounded-full' src={profile_path} alt='user profile' />
        </Link>
        <Link
          className='hover:text-white/70'
          to={`/details/${movie_id}/discussions/${discussion_id}`}
        >
          {subject}
        </Link>
      </div>

      {isMovieLoading ? (
        <LoadingIndicator />
      ) : (
        <div className='flex items-center ml-12'>
          <span>↪︎</span>
          <img
            className='w-6 h-9 ml-4'
            src={buildImageUrl(movie?.posterPath, 'w92')}
            alt='movie poster'
          />
          <Link className='ml-2' to={`/details/${movie_id}`}>
            {movie?.title}
          </Link>
        </div>
      )}
    </div>
  );
}

function Discussion() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  let page = queryParams.get('page');

  if (!page) {
    page = '1';
  }
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    // Update the URL with the new page parameter
    queryParams.set('page', newPage.toString());
    const movieListElement = document.getElementById('top');
    if (movieListElement) {
      movieListElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    navigate(`${window.location.pathname}?${queryParams.toString()}`);
  };
  const headers = [
    { title: 'Subject', dataIndex: 'subject', className: 'w-1/2 px-4 py-4' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Replies', dataIndex: 'replies' },
    { title: 'Last Reply', dataIndex: 'last_reply' }
  ];

  const { data, isLoading } = useQuery(['discussionPage', page], () => getDiscussionByPage(page), {
    select(data) {
      return {
        ...data,
        discussions: data?.discussions.map((discussion: any) => {
          return {
            _id: discussion._id,
            movie_id: discussion.movie_id,
            subject: (
              <DiscussionSubject
                movie_id={discussion.movie_id}
                subject={discussion.subject}
                user_id={discussion.discussion_part[0].user_id}
                profile_path={discussion.discussion_part[0].profile_path}
                discussion_id={discussion._id}
              />
            ),
            status: discussion.status ? 'Open' : 'Closed',
            replies: discussion.discussion_part.length - 1,
            last_reply: (
              <div>
                <p>
                  {new Date(
                    discussion.discussion_part[discussion.discussion_part.length - 1].timestamp
                  ).toLocaleString('en-US', options)}
                </p>
                <p>by {discussion.discussion_part[discussion.discussion_part.length - 1].name}</p>
              </div>
            )
          };
        })
      };
    }
  });

  console.log(data);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className='w-full p-8'>
      <h2 id='top' className='text-2xl font-semibold scroll-m-12'>
        Let&apos;s Chat
      </h2>
      <Table
        className='border-border border-1 shadow-md shadow-border/50 rounded-sm mt-10 w-full'
        classNameTable='bg-transparent w-full'
        classNameBody='border-t border-[#01b4e4]/50'
        classNameRowSelected={data ? '' : 'bg-border/30 '}
        classNameHeader='bg-transparent text-white text-left'
        classNameRow='bg-border/30 '
        classNameRowOdd='bg-transparent '
        noDivider={true}
        canSelected={false}
        headers={headers}
        data={
          data
            ? [
                ...data.discussions,
                {
                  subject: (
                    <ReactPaginate
                      className='react-paginate'
                      breakLabel='...'
                      nextLabel='Next >'
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      initialPage={data?.page - 1}
                      pageCount={data?.total_page}
                      disableInitialCallback={true}
                      previousLabel='< Prev'
                      renderOnZeroPageCount={null}
                    />
                  ),
                  colSpan: 4
                }
              ]
            : [
                {
                  subject: <p>No discussions.</p>
                }
              ]
        }
      />
    </div>
  );
}

export default Discussion;
