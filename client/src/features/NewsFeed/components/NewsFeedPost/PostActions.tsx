// clsx
import clsx from 'clsx';

// material ui icons
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import { useUsersSelector } from '@/redux/selectors';
import { likePost } from '@/redux/actions/posts';
import useMyDispatch from '@/hooks/useMyDispatch';

interface PostActionsProps {
  postId: string;
  likes: string[];
}

function PostActions(props: PostActionsProps) {
  const { postId, likes } = props;

  const { currentUser } = useUsersSelector();
  const dispatch = useMyDispatch();

  const isLiked = likes.includes(currentUser._id);

  const handleLikePost = () => {
    dispatch(likePost.request(postId));
  };

  return (
    <div
      className={clsx(
        'flex items-center mt-3 pt-1 border-t border-lt-line dark:border-dk-line'
      )}>
      <div
        onClick={handleLikePost}
        className={clsx(
          'group i-flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer select-none',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
        )}>
        {isLiked ? (
          <ThumbUpAltIcon
            className={clsx(
              'mr-1.5 !text-lg md:!text-xl',
              'text-[#2d86ff] dark:text-primary-v4',
              '!transition-all ease-out',
              'dark:group-hover:text-primary-v4'
            )}
          />
        ) : (
          <ThumbUpAltOutlinedIcon
            className={clsx(
              'mr-1.5 !text-lg md:!text-xl',
              'text-gray-500',
              '!transition-all ease-out',
              'dark:group-hover:text-primary-v4'
            )}
          />
        )}
        <span
          className={clsx(
            'font-bold text-xs md:text-sm',
            isLiked ? 'text-[#2d86ff] dark:text-primary-v4' : 'text-gray',
            'transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}>
          {isLiked ? 'Liked' : 'Like'}
        </span>
      </div>
      <div
        className={clsx(
          'group i-flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer select-none',
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
          'cursor-pointer select-none',
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
