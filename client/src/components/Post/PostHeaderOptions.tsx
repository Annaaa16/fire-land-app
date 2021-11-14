// clsx
import clsx from 'clsx';

// material ui icons
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import { postsActions } from '@/redux/slices/postsSlice';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';

interface PostHeaderOptionsProps {
  postId: string;
  userId: string;
}

function PostHeaderOptions(props: PostHeaderOptionsProps) {
  const { postId, userId } = props;

  const { toggleSenderArea } = useGlobalContext();
  const { currentUser } = useUsersSelector();

  const dispatch = useStoreDispatch();

  const handleEditPost = () => {
    dispatch(postsActions.setUpdatePost(postId));
    toggleSenderArea(true);
  };

  const handleDeletePost = () => {
    dispatch(postsActions.deletePostRequest(postId));
  };

  return (
    <ul
      className={clsx(
        'absolute right-0 top-full z-[10]',
        'p-2 mt-1 min-w-max rounded-lg shadow-box scale-0 opacity-0 invisible',
        'bg-white dark:bg-dk-cpn',
        'origin-top-right transition-all duration-[350ms] ease-out',
        'pointer-events-none',
        'group-hover:scale-100 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
      )}>
      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <PushPinOutlinedIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-bold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Pin post
        </span>
      </li>
      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <BookmarksOutlinedIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-bold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Save post
        </span>
      </li>

      <div
        className={clsx('h-px w-full my-1.5', 'bg-lt-line dark:bg-dk-line')}
      />

      {currentUser._id === userId && (
        <>
          <li
            onClick={handleEditPost}
            className={clsx(
              'pl-2 pr-4 py-3 rounded-lg',
              'dark:bg-dk-cpn',
              'transition-all ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
            )}>
            <EditOutlinedIcon className={clsx('dark:text-white')} />
            <span
              className={clsx(
                'ml-1.5 font-bold text-xs md:text-sm',
                'dark:text-white'
              )}>
              Edit post
            </span>
          </li>
          <li
            className={clsx(
              'pl-2 pr-4 py-3 rounded-lg',
              'dark:bg-dk-cpn',
              'transition-all ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
            )}>
            <PeopleOutlinedIcon className={clsx('dark:text-white')} />
            <span
              className={clsx(
                'ml-1.5 font-bold text-xs md:text-sm',
                'dark:text-white'
              )}>
              Edit audience
            </span>
          </li>
        </>
      )}
      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <NotificationsOffOutlinedIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-bold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Turn off notification for this post
        </span>
      </li>
      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <HideImageOutlinedIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-bold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Hide post
        </span>
      </li>
      {currentUser._id === userId && (
        <li
          className={clsx(
            'pl-2 pr-4 py-3 rounded-lg',
            'dark:bg-dk-cpn',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
          )}>
          <EventNoteOutlinedIcon className={clsx('dark:text-white')} />
          <span
            className={clsx(
              'ml-1.5 font-bold text-xs md:text-sm',
              'dark:text-white'
            )}>
            Edit date
          </span>
        </li>
      )}

      <div
        className={clsx('h-px w-full my-1.5', 'bg-lt-line dark:bg-dk-line')}
      />

      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <ArchiveOutlinedIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-bold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Move to archive
        </span>
      </li>
      {currentUser._id === userId && (
        <li
          onClick={handleDeletePost}
          className={clsx(
            'pl-2 pr-4 py-3 rounded-lg',
            'dark:bg-dk-cpn',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
          )}>
          <DeleteOutlineOutlinedIcon className={clsx('dark:text-white')} />
          <span
            className={clsx(
              'ml-1.5 font-bold text-xs md:text-sm',
              'dark:text-white'
            )}>
            Move to trash
          </span>
        </li>
      )}

      <li className={clsx('absolute right-0 -top-4 z-50', 'w-1/2 h-8')} />
    </ul>
  );
}

export default PostHeaderOptions;