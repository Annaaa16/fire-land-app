import { useCommentsSelector } from '@/redux/selectors';
import PostComment from './PostComment';

interface PostCommentListProps {
  postId: string;
  userId: string;
  isOpenComments: boolean;
}

function PostCommentList(props: PostCommentListProps) {
  const { postId, isOpenComments } = props;

  const { comments } = useCommentsSelector();

  const filteredComments = comments.filter(
    (comment) => comment.postId === postId
  );

  return (
    <>
      {filteredComments?.length > 0 && isOpenComments && (
        <div className='mt-3'>
          {filteredComments.map((comment, idx) => (
            <PostComment key={'post-comment' + idx} comment={comment} />
          ))}
        </div>
      )}
    </>
  );
}

export default PostCommentList;
