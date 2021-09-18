// clsx
import clsx from 'clsx';

import NewsFeedPost from '../NewsFeedPost';
import NewsFeedSender from '../NewsFeedSender';

function NewsFeedContent() {
  return (
    <div className={clsx('col-span-2')}>
      <NewsFeedSender />
      <NewsFeedPost />
    </div>
  );
}

export default NewsFeedContent;
