// clsx
import clsx from 'clsx';

// material ui icons
import AppsIcon from '@mui/icons-material/Apps';

function HeaderWidget() {
  return (
    <div className={clsx('w-10 md:mx-4')}>
      <AppsIcon
        fontSize='large'
        className={clsx(
          '!w-full',
          'text-white lg:text-primary-v1-text',
          '!transition-all !duration-250',
          'cursor-pointer',
          'hover:text-white'
        )}
      />
    </div>
  );
}

export default HeaderWidget;
