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

  const reaction = reactions.find(
    (reaction) => reaction.userId === currentUser._id
  );

  const {
    isShowReactions,
    selectedEmotion,
    reactPost,
    userActions,
    reactButtonRef,
    reactionsRef,
  } = useReactions({
    postId,
    currentUser,
    reaction,
  });

  const handleReactPost = () => {
    const isReact = reactions.some(
      (reaction) => reaction.userId === currentUser._id
    );

    reactPost({
      emotion: emotions.like.type,
      isReact: !isReact,
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
        className={clsx('relative z-10', 'flex-1')}>
        <div
          onClick={handleReactPost}
          className={clsx(
            'group flex-center py-2.5 rounded-md',
            'transition-all ease-out',
            'cursor-pointer select-none',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
          )}>
          {reaction ? (
            <div className={clsx('w-4.5 h-4.5 mr-1')}>
              <img
                src={selectedEmotion?.icon}
                alt='Emotion'
                className={clsx('w-full h-full object-contain')}
              />
            </div>
          ) : (
            <ThumbUpAltOutlinedIcon
              className={clsx('mr-1.5 !text-lg md:!text-xl', 'text-gray-500')}
            />
          )}
          <div
            className={clsx(
              'font-semibold text-xs md:text-sm capitalize',
              reaction && selectedEmotion?.type === emotions.like.type
                ? 'text-[#2d86ff]'
                : selectedEmotion?.type === emotions.love.type
                ? 'text-[#f33e58]'
                : selectedEmotion?.type === emotions.angry.type
                ? 'text-[#e36915]'
                : !reaction
                ? 'text-gray'
                : 'text-[#efac25]',
              'transition-all ease-out'
            )}>
            {reaction ? selectedEmotion?.type : 'Like'}
          </div>
        </div>

        <Reactions
          reactPost={reactPost}
          isShowReactions={isShowReactions}
          reaction={reaction}
          ref={reactionsRef}
        />
      </button>

      <button
        onClick={onFetchComments}
        className={clsx(
          'group flex-center flex-1 py-2.5 rounded-md',
          'transition-all ease-out',
          'cursor-pointer select-none',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
        )}>
        <ChatBubbleOutlineOutlinedIcon
          className={clsx(
            'mr-1.5 !text-lg md:!text-xl',
            'text-gray-500',
            'dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-semibold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'dark:group-hover:text-primary-v4'
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
            'dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'font-semibold text-xs md:text-sm',
            'text-gray',
            'transition-all ease-out',
            'dark:group-hover:text-primary-v4'
          )}>
          Share
        </span>
      </button>
    </div>
  );
}

export default PostActions;
