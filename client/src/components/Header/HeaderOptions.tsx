// clsx
import clsx from 'clsx';

// material ui icons
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function HeaderOptions() {
  return (
    <div
      className={clsx(
        'fixed md:static left-0 bottom-0',
        'flex items-center justify-center w-full md:w-auto',
        'bg-primary-v1 md:bg-transparent'
      )}>
      <div
        className={clsx(
          'i-flex-center lg:px-4 lg:mx-4 md:border-l md:border-r border-primary-v1-text'
        )}>
        <div className={clsx('px-2 lg:px-0 py-4 md:py-0')}>
          <LocalMallOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-text',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />
        </div>
        <div className={clsx('px-2 lg:px-0 py-4 md:py-0')}>
          <SentimentSatisfiedOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-text',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />
        </div>
        <div className={clsx('px-2 lg:px-0 py-4 md:py-0')}>
          <SmsOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-text',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />
        </div>
        <div className={clsx('relative', 'px-2 lg:px-0 py-4 md:py-0')}>
          <NotificationsNoneOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-white',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />

          <div
            className={clsx(
              'absolute -top-px md:-top-5 right-3 lg:right-1.5',
              'text-4xl',
              'text-primary-v2'
            )}>
            .
          </div>
        </div>
      </div>

      <div
        className={clsx('px-2 md:pr-0 md:ml-2 lg:ml-0 lg:px-0 py-4 md:py-0')}>
        <SettingsOutlinedIcon
          className={clsx('!text-2xl !w-10', 'text-white', 'cursor-pointer')}
        />
      </div>
    </div>
  );
}

export default HeaderOptions;
