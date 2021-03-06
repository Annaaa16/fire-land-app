// clsx
import clsx from 'clsx';

// material ui icons
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

// types
import { Post } from '@/models/common';

import { useUsersSelector } from '@/redux/selectors';
import useReactions, { emotions } from '@/hooks/useReactions';

import Reactions from '../Reactions';

interface PostActionsProps {
  postId: Post['_id'];
  reactions: Post['reactions'];
  onFetchComments: () => void;
}

function PostActions(props: PostActionsProps) {
  const { postId, reactions, onFetchComments } = props;

  const { currentUser } = useUsersSelector();

  const selectedReaction = reactions.find(
    (reaction) => reaction.userId === currentUser._id
  );
  const isReacted = Boolean(selectedReaction);

  const {
    isOpenReactions,
    selectedEmotion,
    reactPost,
    userActions,
    reactButtonRef,
  } = useReactions({
    postId,
    currentUser,
    reaction: selectedReaction,
  });

  const handleReactPost = () => {
    reactPost({
      emotion: emotions.like.type,
      isReact: !isReacted,
      isUpdate: false,
    });
  };

  return (
    <div
      className={clsx(
        'flex items-center mt-3 pt-1 border-t border-lt-line dark:border-dk-line'
      )}>
      <button
        ref={reactButtonRef}
        {...userActions}
        className={clsx('relative', 'flex-1')}>
        <div
          onClick={handleReactPost}
          className={clsx(
            'group flex-center py-2.5 rounded-md',
            'transition-all ease-out',
            'cursor-pointer select-none',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
          )}>
          {isReacted ? (
            <div className={clsx('w-4.5 h-4.5 mr-1.5')}>
              <img
                src={selectedEmotion?.icon}
                alt='Emotion'
                className={clsx('w-full h-full object-contain')}
              />
            </div>
          ) : (
            <ThumbUpAltOutlinedIcon
              className={clsx(
                'mr-1.5 !text-lg md:!text-xl',
                'text-gray-500',
                'lg:dark:group-hover:text-primary-v4'
              )}
            />
          )}
          <div
            className={clsx(
              'font-semibold text-xs md:text-sm capitalize',
              isReacted && selectedEmotion?.type === emotions.like.type
                ? 'text-fb-blue-500'
                : selectedEmotion?.type === emotions.love.type
                ? 'text-fb-red'
                : selectedEmotion?.type === emotions.angry.type
                ? 'text-fb-orange'
                : !isReacted
                ? 'text-gray'
                : 'text-fb-yellow',
              'transition-all ease-out',
              !isReacted && 'lg:dark:group-hover:text-primary-v4'
            )}>
            {isReacted ? selectedEmotion?.type : 'Like'}
          </div>
        </div>

        <Reactions
          onReactPost={reactPost}
          isOpen={isOpenReactions}
          isReacted={isReacted}
        />
      </button>

      <button
        onClick={onFetchComments}
        className={clsx(
          'group flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer select-none',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip',
          'lg:dark:group-hover:text-primary-v4'
        )}>
        <ChatBubbleOutlineOutlinedIcon
          className={clsx(
            'mr-1.5 !text-lg md:!text-xl',
            'text-gray-500',
            'lg:dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-semibold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'lg:dark:group-hover:text-primary-v4'
          )}>
          Comment
        </span>
      </button>

      <button
        className={clsx(
          'group flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer select-none',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
        )}>
        <ShareOutlinedIcon
          className={clsx(
            'mr-1.5 !text-lg md:!text-xl',
            'text-gray-500',
            'lg:dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-semibold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'lg:dark:group-hover:text-primary-v4'
          )}>
          Share
        </span>
      </button>
    </div>
  );
}

export default PostActions;
