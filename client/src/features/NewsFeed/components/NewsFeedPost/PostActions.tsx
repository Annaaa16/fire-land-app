// clsx
import clsx from 'clsx';

// material ui icons
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

function PostActions() {
  return (
    <div
      className={clsx(
        'flex items-center mt-3 pt-1 border-t border-lt-line dark:border-dk-line'
      )}>
      <div
        className={clsx(
          'group i-flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <ThumbUpAltOutlinedIcon
          className={clsx(
            'mr-1.5 !text-lg md:!text-xl',
            'text-gray-500',
            '!transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-bold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}>
          Like
        </span>
      </div>
      <div
        className={clsx(
          'group i-flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <ChatBubbleOutlineOutlinedIcon
          className={clsx(
            'mr-1.5 !text-lg md:!text-xl',
            'text-gray-500',
            '!transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-bold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}>
          Comment
        </span>
      </div>
      <div
        className={clsx(
          'group i-flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        <ShareOutlinedIcon
          className={clsx(
            'mr-1.5 !text-lg md:!text-xl',
            'text-gray-500',
            '!transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-bold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}>
          Share
        </span>
      </div>
    </div>
  );
}

export default PostActions;
