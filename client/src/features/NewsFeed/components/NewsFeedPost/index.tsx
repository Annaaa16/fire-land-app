// clsx
import clsx from 'clsx';

// types
import { Post } from '@/models/common';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostDetail from './PostDetail';
import PostComment from './PostComment';

function NewsFeedPost(props: Post) {
  const {
    _id,
    content,
    photo,
    likes,
    user: { username, _id: userId, avatar },
  } = props;

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
      />
      <PostContent content={content} photo={photo} />

      <div className={clsx('px-2 md:px-4 pt-3.5 pb-2')}>
        <PostDetail likes={likes} />
        <PostActions postId={_id} likes={likes} />
        <PostComment avatar={avatar} />
      </div>
    </div>
  );
}

export default NewsFeedPost;
