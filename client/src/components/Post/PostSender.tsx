import { useState } from 'react';

// types
import { FormEvent, Dispatch, SetStateAction } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import { commentsActions } from '@/redux/slices/commentsSlice';
import { useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useUsers from '@/hooks/useUsers';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';

interface PostSenderProps {
  postId: string;
  onSetIsOpenComments: Dispatch<SetStateAction<boolean>>;
}

function PostSender(props: PostSenderProps) {
  const { postId, onSetIsOpenComments } = props;

  const {
    currentUser: { _id: userId, avatar },
  } = useUsersSelector();

  const [content, setContent] = useState<string>('');

  const { visitWall } = useUsers();
  const dispatch = useStoreDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    const payload = { content, userId, postId };

    dispatch(commentsActions.createCommentRequest(payload));
    onSetIsOpenComments(true);
    setContent('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'flex items-center border-t border-lt-line dark:border-dk-line mt-1 pt-4 pb-3'
      )}>
      <User
        avatar={avatar}
        view='sm'
        rounded
        onClick={() => visitWall(userId)}
      />
      <div
        className={clsx(
          'flex flex-1 ml-2.5 justify-between rounded-3xl',
          'bg-lt-input dark:bg-dk-input'
        )}>
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='Write a comment...'
          className={clsx(
            'pl-4 flex-1 md:max-w-full outline-none py-3 text-xs md:text-sm',
            'dark:text-white bg-transparent'
          )}
        />
        <ul className={clsx('flex items-center')}>
          <li
            className={clsx(
              'relative',
              'group hidden md:flex-center w-10 h-10 rounded-full',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:bg-gray-200 lg:dark:hover:bg-dk-tooltip'
            )}>
            <SentimentSatisfiedIcon
              fontSize='small'
              className={clsx('!text-xl', 'text-gray-400')}
            />
            <Tooltip title='Insert an emoji' direction='ttb' />
          </li>
          <li
            className={clsx(
              'relative',
              'group flex-center w-10 h-10 rounded-full',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:bg-gray-200 lg:dark:hover:bg-dk-tooltip'
            )}>
            <PhotoCameraBackOutlinedIcon
              fontSize='small'
              className={clsx('!text-xl', 'text-gray-400')}
            />
            <Tooltip title='Attach a photo or video' direction='ttb' />
          </li>
          <li
            className={clsx(
              'relative',
              'group flex-center w-10 h-10 rounded-full',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:bg-gray-200 lg:dark:hover:bg-dk-tooltip'
            )}>
            <StorefrontOutlinedIcon
              fontSize='small'
              className={clsx('!text-xl', 'text-gray-400')}
            />
            <Tooltip title='Comment with a sticker' direction='ttb' />
          </li>
        </ul>
      </div>
    </form>
  );
}

export default PostSender;
