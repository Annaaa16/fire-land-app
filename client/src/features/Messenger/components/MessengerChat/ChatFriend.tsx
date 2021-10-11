// clsx
import clsx from 'clsx';

interface ChatFriendProps {
  message: string;
}

function ChatFriend(props: ChatFriendProps) {
  const { message } = props;

  return (
    <div className={clsx('flex flex-col items-start ml-3')}>
      <div
        className={clsx(
          'inline-flex text-xs md:text-sm px-5 py-2.5 mb-2 rounded-full leading-5',
          'bg-[#dddddf] dark:text-white dark:bg-dk-tooltip-hv'
        )}>
        {message}
      </div>
    </div>
  );
}

export default ChatFriend;
