// clsx
import clsx from 'clsx';

// material ui icons
import AppsIcon from '@mui/icons-material/Apps';

function HeaderWidget() {
  return (
    <div className={clsx('w-10 ml-2 md:mx-4 lg:ml-0')}>
      <AppsIcon
        fontSize='large'
        className={clsx(
          '!w-full',
          'text-white lg:text-primary-v1-txt',
          'cursor-pointer',
          'hover:text-white'
        )}
      />
    </div>
  );
}

export default HeaderWidget;
