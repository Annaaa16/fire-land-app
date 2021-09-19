// clsx
import clsx from 'clsx';

function ChatUser() {
  return (
    <ul className={clsx('flex flex-col items-end ml-3')}>
      <li
        className={clsx(
          'inline-flex px-5 mb-2 py-2.5 rounded-full leading-5',
          'text-white bg-primary-v1 dark:bg-primary-v4'
        )}>
        What the fuck are you doing?
      </li>
      <li
        className={clsx(
          'inline-flex px-5 mb-2 py-2.5 rounded-full leading-5',
          'text-white bg-primary-v1 dark:bg-primary-v4'
        )}>
        What the fuck are you doing? What the fuck are you doing?
      </li>
    </ul>
  );
}

export default ChatUser;
