// clsx
import clsx from 'clsx';

// material ui icons
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import User from '@/components/User';

import Tooltip from '@/components/Tooltip';

// images
import cover from '@/assets/images/profile/cover.jpg';

function ProfileCover() {
  return (
    <section
      style={{ backgroundImage: `url(${cover.src})` }}
      className={clsx(
        'relative',
        'h-80 rounded-lg flex justify-between items-end object-cover pb-8 px-6 overflow-hidden',
        'bg-cover bg-center'
      )}>
      <div
        className={clsx(
          'absolute inset-0',
          'opacity-90',
          'bg-gradient-to-t from-dk-body to-transparent'
        )}
      />
      <div className={clsx('relative', 'flex items-center')}>
        <User
          avatar='https://avatars.dicebear.com/api/avataaars/wYqKSN.svg'
          subClass={clsx('w-24 h-24 mr-2')}
        />
        <div>
          <div className={clsx('mb-4', 'text-white')}>
            <h1 className={clsx('text-lg leading-normal', 'font-bold')}>
              IG Dev
            </h1>
            <p className={clsx('text-sm-1')}>Fuck you bitch!</p>
          </div>
          <div className={clsx('relative', 'inline-block group')}>
            <AddToPhotosIcon className={clsx('text-white', 'cursor-pointer')} />
            <Tooltip title='Add social network' direction='rtl' />
          </div>
        </div>
      </div>
      <ul className={clsx('relative', 'flex items-center', 'text-white')}>
        <li className={clsx('mr-2')}>
          Posts: <strong>30</strong>
        </li>
        <li className={clsx('mr-2')}>
          Posts: <strong>30</strong>
        </li>
      </ul>
    </section>
  );
}

export default ProfileCover;
