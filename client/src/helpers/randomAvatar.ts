// nanoid
import { nanoid } from 'nanoid';

import { AVATAR_URL } from '@/constants';

const avatarList = [
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'croodles',
  'croodles-neutral',
  'micah',
  'miniavs',
  'miniavs',
  'miniavs',
  'pixel-art-neutral',
];

const randomAvatar = () => {
  const avatar = avatarList[Math.floor(Math.random() * avatarList.length)];

  const avatarUrl = `${AVATAR_URL}/${avatar}/${nanoid(6)}.svg`;

  return avatarUrl;
};

export default randomAvatar;
