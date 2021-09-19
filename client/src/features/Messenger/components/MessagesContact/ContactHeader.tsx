// clsx
import clsx from 'clsx';

// material ui icons
import GridViewIcon from '@mui/icons-material/GridView';

function ContactHeader() {
  return (
    <div>
      <div className={clsx('relative', 'px-8')}>
        <h1 className={clsx('font-bold text-xl mb-3', 'dark:text-white')}>
          Recent
        </h1>
        <p className={clsx('text-sm', 'text-lt-gray')}>
          Chat from your friends!
        </p>
        <div
          className={clsx(
            'absolute right-8 top-1/2',
            'group -translate-y-1/2',
            'cursor-pointer'
          )}>
          <GridViewIcon
            className={clsx(
              '!text-2xl',
              'text-lt-gray',
              '!transition-all ease-out',
              'group-hover:text-gray-500 dark:group-hover:text-white'
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactHeader;
