// clsx
import clsx from 'clsx';

// material ui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function LoginSocial() {
  return (
    <>
      <span
        className={clsx(
          'text-center font-semibold text-xs lg:text-sm mt-12',
          'dark:text-white'
        )}>
        Login with your Social Account
      </span>

      <div className={clsx('flex items-center mt-7')}>
        <div className={clsx('flex-center p-2 rounded-lg', 'cursor-pointer')}>
          <FacebookIcon
            className={clsx(
              '!text-2xl',
              'text-[#139df8]',
              'lg:hover:scale-125'
            )}
          />
        </div>
        <div
          className={clsx('flex-center p-2 rounded-lg ml-2', 'cursor-pointer')}>
          <TwitterIcon
            className={clsx(
              '!text-2xl',
              'text-[#139df8]',
              'lg:hover:scale-125'
            )}
          />
        </div>
        <div
          className={clsx('flex-center p-2 rounded-lg ml-2', 'cursor-pointer')}>
          <YouTubeIcon
            className={clsx(
              '!text-2xl',
              'text-[#fd434f]',
              'lg:hover:scale-125'
            )}
          />
        </div>
        <div
          className={clsx('flex-center p-2 rounded-lg ml-2', 'cursor-pointer')}>
          <InstagramIcon
            className={clsx(
              '!text-2xl',
              'text-[#c13584]',
              'lg:hover:scale-125'
            )}
          />
        </div>
      </div>
    </>
  );
}

export default LoginSocial;
