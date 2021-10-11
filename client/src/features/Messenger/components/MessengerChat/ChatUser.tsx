// clsx
import clsx from 'clsx';

interface ChatUserProps {
  message: string;
}

function ChatUser(props: ChatUserProps) {
  const { message } = props;

  return (
    <div className={clsx('flex flex-col items-end ml-3')}>
      <div
        className={clsx(
          'inline-flex items-end px-5 text-xs md:text-sm mb-2 py-2.5 rounded-full leading-5',
          'text-white bg-primary-v1 dark:bg-primary-v4'
        )}>
        {message}
      </div>
    </div>
  );
}

export default ChatUser;
