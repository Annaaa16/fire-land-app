// clsx
import clsx from 'clsx';

function ChatFriend() {
  return (
    <ul className={clsx('flex flex-col items-start ml-3')}>
      <li
        className={clsx(
          'inline-flex text-xs md:text-sm px-5 py-2.5 mb-2 rounded-full leading-5',
          'bg-[#dddddf] dark:text-white dark:bg-dk-tooltip-hv'
        )}>
        What the fuck are you doing? What the fuck are you doing?
      </li>
      <li
        className={clsx(
          'inline-flex text-xs md:text-sm px-5 py-2.5 mb-2 rounded-full leading-5',
          'bg-[#dddddf] dark:text-white dark:bg-dk-tooltip-hv'
        )}>
        What are you doing?
      </li>
      <li
        className={clsx(
          'inline-flex text-xs md:text-sm px-5 py-2.5 rounded-full leading-5',
          'bg-[#dddddf] dark:text-white dark:bg-dk-tooltip-hv'
        )}>
        What the fuck are you doing?
      </li>
    </ul>
  );
}

export default ChatFriend;
