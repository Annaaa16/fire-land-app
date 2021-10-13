// clsx
import clsx from 'clsx';

import useCompareNode from '@/hooks/useCompareNode';

interface ChatUserProps {
  message: string;
}

function ChatUser(props: ChatUserProps) {
  const { message } = props;

  const { isNodeEqual, elRef, compared } = useCompareNode('user-msg');

  return (
    <div
      ref={elRef}
      className={clsx(compared, 'flex w-5/6 ml-auto', !isNodeEqual && 'mt-4')}>
      <p
        className={clsx(
          'flex ml-auto px-5 text-xs md:text-sm mb-2 py-2 rounded-3xl lg:rounded-full leading-5 break-all',
          'text-white bg-primary-v1 dark:bg-primary-v4'
        )}>
        {message}
      </p>
    </div>
  );
}

export default ChatUser;
