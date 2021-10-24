// nanoid
import { nanoid } from 'nanoid';

import { URLS } from '@/constants';

const avatarList = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'croodles',
  'croodles-neutral',
  'micah',
  'miniavs',
  'open-peeps',
  'personas',
];

const randomAvatar = () => {
  const idx = Math.floor(Math.random() * avatarList.length);
  const avatar = avatarList[idx];
  const seed = nanoid(6);

  const avatarUrl = `${URLS.AVATAR}/${avatar}/${seed}.svg`;

  return avatarUrl;
};

export default randomAvatar;
