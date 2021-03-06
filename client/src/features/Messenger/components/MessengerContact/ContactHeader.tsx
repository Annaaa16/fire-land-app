// clsx
import clsx from 'clsx';

// material ui icons
import GridViewIcon from '@mui/icons-material/GridView';

function ContactHeader() {
  return (
    <div className='mb-4'>
      <div className={clsx('flex-between mb-3')}>
        <h1 className={clsx('font-semibold text-xl', 'dark:text-white')}>
          Recent
        </h1>
        <div className={clsx('group', 'cursor-pointer')}>
          <GridViewIcon
            className={clsx(
              '!text-2xl',
              'text-gray-lt',
              'group-hover:text-gray-500 dark:group-hover:text-white'
            )}
          />
        </div>
      </div>
      <p className={clsx('text-sm', 'text-gray-lt')}>Chat from your friends!</p>
    </div>
  );
}

export default ContactHeader;
