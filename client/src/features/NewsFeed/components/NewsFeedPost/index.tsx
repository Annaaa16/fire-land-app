// clsx
import clsx from 'clsx';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostDetail from './PostDetail';
import PostComment from './PostComment';

function NewsFeedPost() {
  return (
    <div
      className={clsx(
        'mt-7 rounded-lg shadow-md dark:shadow-xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <PostHeader />
      <PostContent />

      <div className={clsx('px-2 md:px-4 pt-3.5 pb-2')}>
        <PostDetail />
        <PostActions />
        <PostComment />
      </div>
    </div>
  );
}

export default NewsFeedPost;
