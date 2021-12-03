// clsx
import clsx from 'clsx';

// material ui icons
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';
import { conversationsActions } from '@/redux/slices/conversationsSlice';
import { actions, usersActions } from '@/redux/slices/usersSlice';
import useUsers from '@/hooks/useUsers';

import User from '@/components/User';
import Spinner from '../Spinner';
import useStoreDispatch from '@/hooks/useStoreDispatch';

interface PostHeaderBoxProps {
  userId: string;
  username: string;
  avatar: string;
  followers: string[];
}

function PostHeaderBox(props: PostHeaderBoxProps) {
  const { username, avatar, userId, followers } = props;

  const { visitWall } = useUsers();
  const { conversations } = useConversationsSelector();
  const { currentUser, loadings } = useUsersSelector();

  const dispatch = useStoreDispatch();

  const isFollowing = currentUser.followings.includes(userId);
  const isLoading =
    loadings.includes(actions.followUser) ||
    loadings.includes(actions.unfollowUser);

  const handleMakeFriend = (followedUserId: string) => {
    const { _id, followings } = currentUser;

    if (!_id || !followedUserId) return;

    const addFriend = () => {
      dispatch(
        conversationsActions.createConversationRequest({
          senderId: _id as string,
          receiverId: followedUserId,
        })
      );

      dispatch(usersActions.followUserRequest(followedUserId));
    };

    const unfriend = async () => {
      const conversation = conversations.find(
        ({ memberIds }) =>
          memberIds.includes(_id) && memberIds.includes(followedUserId)
      );

      dispatch(usersActions.unfollowUserRequest(followedUserId));
      dispatch(
        conversationsActions.deleteConversationRequest(conversation!._id)
      );
    };

    followings.includes(followedUserId) ? unfriend() : addFriend();
  };

  return (
    <div
      className={clsx(
        'absolute bottom-full left-0',
        'scale-0 opacity-0 invisible pb-4 w-87',
        'transition-all ease-out',
        'pointer-events-none',
        'lg:group-hover:scale-100 origin-bottom-left lg:group-hover:opacity-100 lg:group-hover:visible group-hover:pointer-events-auto'
      )}>
      <div
        className={clsx(
          'relative',
          'px-3 pb-3 pt-5 shadow-box rounded-xl',
          'dark:text-white bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('flex items-center mb-6')}>
          <User
            onClick={() => visitWall(userId)}
            avatar={avatar}
            className={clsx('w-14 h-14 mr-2')}
            rounded
          />
          <div>
            <h2
              onClick={() => visitWall(userId)}
              className={clsx(
                'font-semibold text-lg mb-4 ml-0.5',
                'cursor-pointer',
                'lg:hover:underline'
              )}>
              {username}
            </h2>
            <div className={clsx('flex items-center')}>
              <RssFeedIcon />
              <div className={clsx('ml-1')}>
                <span className={clsx('text-sm-1')}>Followed by </span>
                <strong
                  className={clsx(
                    'text-sm-1',
                    'cursor-pointer',
                    'lg:hover:underline'
                  )}>
                  {followers?.length} people
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('flex-between h-9')}>
          <button
            onClick={() => !isLoading && handleMakeFriend(userId)}
            className={clsx(
              'flex-center flex-grow h-full rounded-lg px-5',
              isFollowing
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-primary-v1 dark:bg-primary-v4',
              'transition-all ease-out',
              isFollowing
                ? 'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
                : 'hover:bg-primary-v1-hv dark:hover:bg-primary-v4-hv'
            )}>
            {!isLoading ? (
              <>
                {isFollowing ? (
                  <PersonRemoveIcon className={clsx('mr-1 !text-lg')} />
                ) : (
                  <PersonAddIcon
                    className={clsx('mr-1 !text-lg', 'text-white')}
                  />
                )}
                <span
                  className={clsx(
                    'font-semibold text-sm-1',
                    !isFollowing && 'text-white'
                  )}>
                  {isFollowing ? 'Unfriend' : 'Add Friend'}
                </span>
              </>
            ) : (
              <Spinner />
            )}
          </button>

          <button
            className={clsx(
              'h-full px-5 rounded-lg mx-2',
              'bg-gray-200 dark:bg-gray-700',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
            )}>
            <ChatIcon className={clsx('!text-lg')} />
            <span className={clsx('font-semibold ml-1 text-sm-1')}>
              Message
            </span>
          </button>

          <button
            className={clsx(
              'h-full px-4 rounded-lg',
              'bg-gray-200 dark:bg-gray-700',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
            )}>
            <MoreHorizOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostHeaderBox;
