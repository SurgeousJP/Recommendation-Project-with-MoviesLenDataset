import DiscussionPart from './DiscussionPart.type';

interface Discussion {
  discussion_id: number;
  movie_id: number;
  subject: string;
  status: boolean;
  discussion_part: DiscussionPart[];
}

export default Discussion;
