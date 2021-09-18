// clsx
import clsx from 'clsx';
import NewsFeedSenderArea from './NewsFeedSenderArea';

import NewsFeedSenderInput from './NewsFeedSenderInput';

function NewsFeedContent() {
  return (
    <div className={clsx('col-span-2')}>
      <NewsFeedSenderInput />
      <NewsFeedSenderArea />
    </div>
  );
}

export default NewsFeedContent;
