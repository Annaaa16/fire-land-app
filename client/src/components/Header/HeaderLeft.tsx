import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import AppsIcon from '@mui/icons-material/Apps';

import { PATHS } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';

import Image from '../Image';

// svgs
import icon from '@/assets/svgs/icon.svg';

function HeaderLeft() {
  const { isLargeMenu, setLargeMenu } = useGlobalContext();

  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(PATHS.NEWSFEED)}
        className={clsx('w-10 h-10 md:w-12 md:h-12 lg:mr-2', 'cursor-pointer')}>
        <Image
          src={icon.src}
          alt='Logo'
          styleLoading='cover'
          layout='fill'
          objectFit='contain'
          className='rat'
          priority={true}
        />
      </div>
      <div
        data-menu-button
        onClick={() => setLargeMenu(!isLargeMenu)}
        className={clsx('w-10 ml-2 md:mx-4 lg:ml-0')}>
        <AppsIcon
          data-menu-button
          fontSize='large'
          className={clsx(
            '!w-full',
            'cursor-pointer',
            'lg:hover:text-white',
            isLargeMenu ? 'text-white' : 'text-primary-v1-txt'
          )}
        />
      </div>
    </>
  );
}

export default HeaderLeft;
