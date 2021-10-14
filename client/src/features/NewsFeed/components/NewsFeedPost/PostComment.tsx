// clsx
import clsx from 'clsx';

// material ui icons
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';

interface PostCommentProps {
  avatar: string;
}

function PostComment(props: PostCommentProps) {
  const { avatar } = props;

  return (
    <form
      className={clsx(
        'flex items-center border-t border-lt-line dark:border-dk-line mt-1 pt-4 pb-3'
      )}>
      <User avatar={avatar} view='small' />
      <div
        className={clsx(
          'flex flex-1 ml-2.5 justify-between rounded-3xl',
          'bg-[#f0f2f5] dark:bg-dk-input'
        )}>
        <input
          placeholder='Write a comment...'
          className={clsx(
            'flex-1 pl-4 outline-none py-3 text-xs md:text-sm',
            'dark:text-white bg-transparent'
          )}
        />
        <ul className={clsx('flex items-center')}>
          <li
            className={clsx(
              'relative',
              'group i-flex-center w-10 h-10 rounded-full',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:bg-gray-200 lg:dark:hover:bg-dk-tooltip-hv'
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
              'group i-flex-center w-10 h-10 rounded-full',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:bg-gray-200 lg:dark:hover:bg-dk-tooltip-hv'
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
              'group i-flex-center w-10 h-10 rounded-full',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:bg-gray-200 lg:dark:hover:bg-dk-tooltip-hv'
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

export default PostComment;
