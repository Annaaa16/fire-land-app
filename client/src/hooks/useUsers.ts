import { useRouter } from 'next/router';

import { PATHS } from '@/constants';

const useUsers = () => {
  const router = useRouter();

  const visitWall = (userId: string) => {
    router.push({ pathname: PATHS.WALL + '/[id]', query: { id: userId } });
  };

  return { visitWall };
};

export default useUsers;
