// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactFriends from './ContactFriends';

function ContactContent() {
  return (
    <>
      <div className={clsx('mt-5 px-8')}>
        <div
          className={clsx(
            'flex items-center rounded-full px-3',
            'bg-lt-input dark:text-white dark:bg-dk-input'
          )}>
          <input
            placeholder='Search Messenger'
            className={clsx('flex-1 outline-none px-2 py-3', 'bg-transparent')}
          />
          <SearchIcon className={clsx('text-lt-gray', 'cursor-pointer')} />
        </div>

        <div className={clsx('flex items-center justify-between mt-6')}>
          <button
            className={clsx(
              'flex items-center py-2.5 px-7 min-w-[130px] rounded-full',
              'bg-primary-v1 dark:bg-primary-v4'
            )}>
            <ChatBubbleIcon className={clsx('!text-lg', 'text-white')} />
            <span className={clsx('ml-1 font-bold', 'text-white')}>
              Friends
            </span>
          </button>
          <button
            className={clsx(
              'flex items-center py-2.5 px-7 min-w-[130px] rounded-full',
              'transition-all ease-out',
              'bg-gray-200 dark:text-white dark:bg-dk-tooltip-hv ',
              'lg:hover:bg-gray-300 lg:dark:hover:bg-gray-700'
            )}>
            <PeopleAltIcon className={clsx('!text-lg')} />
            <span className={clsx('ml-1 font-bold')}>Groups</span>
          </button>
        </div>
      </div>

      <ContactFriends />
    </>
  );
}

export default ContactContent;
