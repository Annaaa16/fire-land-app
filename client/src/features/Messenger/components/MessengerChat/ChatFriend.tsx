// clsx
import clsx from 'clsx';

import useCompareNode from '@/hooks/useCompareNode';

interface ChatFriendProps {
  message: string;
}

function ChatFriend(props: ChatFriendProps) {
  const { message } = props;

  const dataAttr = 'data-friend-message';

  const { isNodeEqual, elRef } = useCompareNode(dataAttr);

  return (
    <div
      ref={elRef}
      {...{ [dataAttr]: 'true' }}
      className={clsx('flex ml-3 w-5/6', !isNodeEqual && 'mt-4')}>
      <p
        className={clsx(
          'inline-flex text-xs md:text-sm px-5 py-2 mb-2 rounded-3xl lg:rounded-full leading-5 break-all',
          'bg-gray-200 dark:text-white dark:bg-dk-tooltip'
        )}>
        {message}
      </p>
    </div>
  );
}

export default ChatFriend;
