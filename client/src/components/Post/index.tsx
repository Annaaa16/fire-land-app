import { useState } from 'react';

// clsx
import clsx from 'clsx';

// types
import { Pagination, Post as PostType } from '@/models/common';

import { LIMITS } from '@/constants';
import { commentsActions } from '@/redux/slices/commentsSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostDetail from './PostDetail';
import PostSender from './PostSender';
import PostCommentList from './PostCommentList';

function Post(props: PostType & Pagination) {
  const {
    _id,
    content,
    photo,
    reactions,
    nextPage,
    total,
    commentCount,
    createdAt,
    user,
  } = props;
  const { username, _id: userId, avatar, followers } = user;

  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
  const dispatch = useStoreDispatch();

  const handleFetchComments = () => {
    // Clear all previous comments before fetch comments
    if (!isOpenComments) {
      dispatch(commentsActions.clearComments(_id));
    }

    setIsOpenComments(!isOpenComments);
    dispatch(
      commentsActions.getCommentsRequest({
        postId: _id,
        userId,
        params: {
          limit: LIMITS.COMMENTS,
          page: 1,
        },
      })
    );
  };

  const handleGetMoreComments = () => {
    if (isOpenComments && nextPage) {
      dispatch(
        commentsActions.getCommentsRequest({
          postId: _id,
          userId,
          params: {
            limit: LIMITS.COMMENTS,
            page: nextPage,
          },
        })
      );
    }
  };

  return (
    <div
      className={clsx(
        'mt-7 rounded-lg shadow-md dark:shadow-xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <PostHeader
        postId={_id}
        username={username}
        userId={userId}
        avatar={avatar}
        createdAt={createdAt}
        followers={followers}
      />
      <PostContent content={content} photo={photo} />

      <div className={clsx('px-2 md:px-4 pt-3.5 pb-2')}>
        <PostDetail reactions={reactions} commentCount={commentCount} />
        <PostActions
          postId={_id}
          reactions={reactions}
          onFetchComments={handleFetchComments}
        />
        <PostSender postId={_id} onSetIsOpenComments={setIsOpenComments} />
        <PostCommentList
          postId={_id}
          isOpenComments={isOpenComments}
          userId={userId}
        />
        {nextPage && isOpenComments && (
          <div
            onClick={handleGetMoreComments}
            className={clsx(
              'font-semibold text-xs mt-3 mb-2',
              'dark:text-white',
              'cursor-pointer',
              'hover:underline'
            )}>
            View {total! - LIMITS.COMMENTS * (nextPage - 1)} more comments
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
