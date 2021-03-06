// clsx
import clsx from 'clsx';

// material ui icons
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import { usePostsSelector, useUsersSelector } from '@/redux/selectors';
import { postActions } from '@/redux/slices/postsSlice';
import { useGlobalContext } from '@/contexts/GlobalContext';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Avatar from '@/components/Avatar';
import SenderForm from './SenderForm';

function NewsFeedSender() {
  const { notifyMaintain } = useGlobalContext();
  const { currentUser } = useUsersSelector();
  const { isOpenFormSender } = usePostsSelector();

  const dispatch = useStoreDispatch();

  const openFormSender = () => {
    dispatch(postActions.setIsOpenFormSender(true));
  };

  return (
    <>
      <div
        className={clsx(
          'shadow-md dark:shadow-xl rounded-lg pt-4 px-2 md:px-4',
          'bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('flex items-center')}>
          <Avatar
            view='sm'
            avatar={currentUser.avatar}
            className={clsx('ml-1 md:ml-0')}
            rounded
          />
          <input
            onClick={openFormSender}
            placeholder={`What's on your mind, IG Dev`}
            className={clsx(
              'flex-1 h-full ml-3 md:ml-4 rounded-full text-xs md:text-sm outline-none px-4 py-3',
              'bg-lt-input dark:bg-dk-input dark:text-white',
              'cursor-pointer'
            )}
            defaultValue=''
            readOnly
          />
        </div>

        <ul
          className={clsx(
            'flex mt-5 py-2 border-t border-lt-line dark:border-dk-line'
          )}>
          <li
            onClick={notifyMaintain}
            className={clsx(
              'hidden md:flex-center flex-1 py-2.5 rounded-lg',
              'cursor-pointer select-none',
              'transition-all ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
            )}>
            <VideoCallIcon
              className={clsx('mr-1.5 !text-2xl', 'text-fb-red')}
            />
            <span className={clsx('font-semibold dark:text-white')}>
              Live Video
            </span>
          </li>
          <li
            onClick={openFormSender}
            className={clsx(
              'flex-center flex-1 py-2.5 rounded-lg',
              'cursor-pointer select-none',
              'transition-all ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
            )}>
            <PhotoLibraryIcon
              className={clsx('mr-1.5 text-xl md:!text-2xl', 'text-fb-green')}
            />
            <span
              className={clsx(
                'text-xs lg:text-sm font-semibold dark:text-white'
              )}>
              Photo
            </span>
          </li>
          <li
            onClick={notifyMaintain}
            className={clsx(
              'flex-center flex-1 py-2.5 rounded-lg',
              'cursor-pointer select-none',
              'transition-all ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
            )}>
            <SentimentVerySatisfiedIcon
              className={clsx('mr-1.5 text-xl md:!text-2xl', 'text-fb-yellow')}
            />
            <span
              className={clsx(
                'text-xs lg:text-sm font-semibold dark:text-white'
              )}>
              Feeling
            </span>
          </li>
        </ul>
      </div>

      {isOpenFormSender && <SenderForm />}
    </>
  );
}

export default NewsFeedSender;
