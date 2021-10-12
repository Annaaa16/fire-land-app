// clsx
import clsx from 'clsx';

import useCompareNode from '@/hooks/useCompareNode';

interface ChatFriendProps {
  message: string;
}

function ChatFriend(props: ChatFriendProps) {
  const { message } = props;

  const { isNodeEqual, elRef, compared } = useCompareNode('friend-msg');

  return (
    <div
      ref={elRef}
      className={clsx(
        compared,
        'flex ml-3 w-5/6',
        !isNodeEqual && 'mt-4',
        'transition-all'
      )}>
      <p
        className={clsx(
          'inline-flex text-xs md:text-sm px-5 py-2 mb-2 rounded-3xl lg:rounded-full leading-5 break-all',
          'bg-[#dddddf] dark:text-white dark:bg-dk-tooltip-hv'
        )}>
        {message}
      </p>
    </div>
  );
}

export default ChatFriend;
