import { useRouter } from 'next/router';

import { PATHS } from '@/constants';
import { useUsersSelector } from '@/redux/selectors';
import { useSocketContext } from '@/contexts/SocketContext';
import { userActions } from '@/redux/slices/usersSlice';
import { addFriend, unfriend } from '@/helpers/notifications';
import { useGlobalContext } from '@/contexts/GlobalContext';
import useStoreDispatch from './useStoreDispatch';

const useUsers = () => {
  const { setDialogData } = useGlobalContext();
  const { socketNotifications } = useSocketContext();
  const { currentUser } = useUsersSelector();

  const dispatch = useStoreDispatch();
  const router = useRouter();

  const visitWall = (userId: string) => {
    router.push({ pathname: PATHS.WALL + '/[id]', query: { id: userId } });
  };

  const makeFriend = (friendId: string, friendName: string) => {
    const { friends } = currentUser;
    const isFriend = friends.includes(friendId);

    const handleAddFriend = () => {
      const message = addFriend(currentUser.username, friendName);

      dispatch(userActions.addFriendUserRequest({ userId: friendId }));
      socketNotifications.sendNotification(message);
    };

    const handleUnfriend = () => {
      const message = unfriend(currentUser.username, friendName);

      dispatch(userActions.unfriendUserRequest({ userId: friendId }));
      socketNotifications.sendNotification(message);
    };

    isFriend
      ? setDialogData({
          title: 'Stay with your friend',
          question: 'Are you sure?',
          confirmHandler: () => handleUnfriend(),
        })
      : handleAddFriend();
  };

  return { visitWall, makeFriend };
};

export default useUsers;
