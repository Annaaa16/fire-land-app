export const addFriend = (username: string, friendName: string) => {
  return username + ' has befriended with ' + friendName;
};

export const unfriend = (username: string, friendName: string) => {
  return username + ' has unfriend with ' + friendName;
};

export const mustBeFriends = (friendName: string) => {
  return 'You must be friends with ' + friendName + ' to send messages';
};
