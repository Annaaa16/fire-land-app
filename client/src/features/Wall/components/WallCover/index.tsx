// clsx
import clsx from 'clsx';

// material ui icons
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import { useUsersSelector } from '@/redux/selectors';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';

// images
import cover from '@/assets/images/profile/cover.jpg';

function WallCover() {
  const { userProfile } = useUsersSelector();

  return (
    <section
      style={{ backgroundImage: `url(${cover.src})` }}
      className={clsx(
        'relative',
        'h-60 lg:h-80 rounded-lg flex justify-between items-end object-cover pb-5 lg:pb-8 px-6 overflow-hidden',
        'bg-cover bg-center'
      )}>
      <div
        className={clsx(
          'absolute inset-0',
          'opacity-90',
          'bg-gradient-to-t from-dk-body to-transparent'
        )}
      />
      <div
        className={clsx(
          'relative',
          'flex items-center justify-center md:justify-start w-full'
        )}>
        <User
          avatar={userProfile.avatar}
          subClass={clsx('w-18 h-18 lg:w-24 lg:h-24 mr-2')}
          rounded
        />
        <div>
          <div className={clsx('mb-1 md:mb-4', 'text-white')}>
            <h1
              className={clsx(
                'text-base mb-1 md:text-lg leading-normal',
                'font-semibold'
              )}>
              {userProfile.username}
            </h1>
            <p className={clsx('text-xs md:text-sm-1')}>Fuck you bitch!</p>
          </div>
          <div className={clsx('relative', 'inline-block group')}>
            <AddToPhotosIcon className={clsx('text-white', 'cursor-pointer')} />
            <Tooltip title='Add social network' direction='rtl' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WallCover;
