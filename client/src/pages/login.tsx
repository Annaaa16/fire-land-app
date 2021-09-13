// material ui icons
import DoneIcon from '@material-ui/icons/Done';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';

// clsx
import clsx from 'clsx';

import {
  ltBackground,
  darkBackground,
  rocket,
  ltDot,
  dkDot,
} from '@/utils/imagesLogin';
import logo from '@/assets/svgs/common/logo.svg';

import styles from '@/components/login/styles.module.scss';

function Login() {
  return (
    <div
      className={clsx(
        'relative md:overflow-hidden dark',
        'grid grid-cols-1 lg:grid-cols-2 w-screen h-full lg:h-screen py-16 px-5 md:py-50 lg:py-0 lg:px-50',
        'lg:bg-center bg-cover bg-no-repeat'
      )}
      style={{ backgroundImage: `url(${darkBackground})` }}>
      <div className={clsx('i-flex-center flex-col text-center mb-8 lg:mb-0')}>
        <h3 className={clsx('font-bold text-xl lg:text-2xl', 'text-white')}>
          WELCOME TO
        </h3>
        <img
          src={logo.src}
          alt='Logo'
          loading='lazy'
          className={clsx('w-40 mb-2', 'cursor-pointer select-none')}
        />
        <p className='hidden lg:block text-white mt-2 text-base px-10'>
          The next generation social network & community! Connect with your
          friends and play with our quests and badges gamification system!
        </p>
      </div>

      <div
        style={{ backgroundImage: `url(${dkDot})` }}
        className={clsx(
          'hidden lg:block',
          'bg-lt-body dark:bg-dk-body',
          styles.decoration
        )}
      />

      <div
        className={clsx(
          'relative',
          'i-flex-center flex-col w-full md:w-form-w lg:h-form-h mr-auto lg:mr-0 ml-auto lg:my-auto py-8 px-5 md:px-16 lg:py-16 rounded-lg shadow-lg',
          'bg-lt-body dark:bg-dk-body'
        )}>
        <img
          src={rocket}
          className={clsx('absolute -left-20 -top-16', 'hidden lg:block w-30')}
          alt='Label'
        />
        <h3
          className={clsx(
            'font-bold text-2xl',
            'text-lt-text dark:text-dk-text'
          )}>
          Account Login
        </h3>
        <form className={clsx('mt-4 lg:mt-10 w-full')}>
          <div className={clsx('relative')}>
            <div className='relative mt-7'>
              <input
                className={clsx(
                  'peer p-4 w-full border border-lt-line dark:border-dk-line focus:border-primary-v1 dark:focus:border-primary-v3 outline-none rounded-lg',
                  'text-lt-text dark:text-dk-text placeholder-transparent bg-transparent',
                  'transition-all'
                )}
                placeholder='placeholder'
                autoComplete='off'
              />
              <label
                className={clsx(
                  'absolute left-4 peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0',
                  'transform -translate-y-1/2 peer-placeholder-shown:px-0 px-1.5 peer-focus:px-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs',
                  'bg-lt-body dark:bg-dk-body text-lt-gray dark:text-dk-gray peer-focus:text-primary-v1 dark:peer-focus:text-primary-v3 text-gray',
                  'transition-all duration-200',
                  'select-none pointer-events-none'
                )}>
                Username
              </label>
            </div>
            <div className='relative mt-8'>
              <input
                className={clsx(
                  'peer p-4 w-full border border-lt-line dark:border-dk-line focus:border-primary-v1 dark:focus:border-primary-v3 outline-none rounded-lg',
                  'text-lt-text dark:text-dk-text placeholder-transparent bg-transparent',
                  'transition-all'
                )}
                placeholder='placeholder'
                autoComplete='off'
              />
              <label
                className={clsx(
                  'absolute left-4 peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0',
                  'transform -translate-y-1/2 peer-placeholder-shown:px-0 px-1.5 peer-focus:px-1.5 peer-placeholder-shown:text-sm text-xs peer-focus:text-xs',
                  'bg-lt-body dark:bg-dk-body text-lt-gray dark:text-dk-gray peer-focus:text-primary-v1 dark:peer-focus:text-primary-v3 text-gray',
                  'transition-all duration-200',
                  'select-none pointer-events-none'
                )}>
                Password
              </label>
            </div>
          </div>

          <div className={clsx('flex justify-between items-center mt-7')}>
            <div className={clsx('flex items-center')}>
              <label
                htmlFor='remember'
                className={clsx(
                  'flex items-center font-bold',
                  'cursor-pointer'
                )}>
                <div className={clsx('relative', 'mr-2.5 w-4 h-4')}>
                  <input
                    id='remember'
                    type='checkbox'
                    className={clsx('peer hidden', 'cursor-pointer')}
                  />
                  <div
                    className={clsx(
                      'absolute top-0 left-0',
                      'i-flex-center w-full h-full rounded border p-2 border-gray dark:border-dk-line peer-checked:border-primary-v2 dark:peer-checked:border-primary-v4',
                      'peer-checked:bg-primary-v2 dark:peer-checked:bg-primary-v4'
                    )}>
                    <DoneIcon
                      className={clsx('text-lt-body dark:text-dk-body !w-4')}
                    />
                  </div>
                </div>
                <span
                  className={clsx(
                    'text-xs lg:text-sm',
                    'text-lt-text dark:text-dk-text'
                  )}>
                  Remember Me
                </span>
              </label>
            </div>
            <span
              className={clsx(
                'text-gray font-bold text-xs lg:text-sm',
                'text-lt-gray dark:text-dk-gray',
                'transition-all',
                'cursor-pointer',
                'hover:text-primary-v2 dark:hover:text-primary-v4'
              )}>
              Forgot Password?
            </span>
          </div>

          <button
            type='submit'
            className={clsx(
              'w-full mt-7 font-bold shadow-md py-4 rounded-lg text-xs lg:text-sm',
              'text-white bg-primary-v1 dark:bg-primary-v3',
              'transition-all',
              'hover:bg-primary-v1-hover dark:hover:bg-primary-v3-hover'
            )}>
            Login to your Account!
          </button>
        </form>

        <span
          className={clsx(
            'text-center font-bold text-xs lg:text-sm mt-12',
            'text-lt-text dark:text-dk-text'
          )}>
          Login with your Social Account
        </span>
        <div className={clsx('flex items-center mt-7')}>
          <div
            className={clsx('i-flex-center p-2 rounded-lg', 'cursor-pointer')}>
            <FacebookIcon
              className={clsx(
                '!text-2xl transform',
                'text-blue',
                '!transition-all',
                'lg:hover:scale-125'
              )}
            />
          </div>
          <div
            className={clsx(
              'i-flex-center p-2 rounded-lg ml-2',
              'cursor-pointer'
            )}>
            <TwitterIcon
              className={clsx(
                '!text-2xl transform',
                'text-blue',
                '!transition-all',
                'lg:hover:scale-125'
              )}
            />
          </div>
          <div
            className={clsx(
              'i-flex-center p-2 rounded-lg ml-2',
              'cursor-pointer'
            )}>
            <YouTubeIcon
              className={clsx(
                '!text-2xl transform',
                'text-red',
                '!transition-all',
                'lg:hover:scale-125'
              )}
            />
          </div>
          <div
            className={clsx(
              'i-flex-center p-2 rounded-lg ml-2',
              'cursor-pointer'
            )}>
            <InstagramIcon
              className={clsx(
                '!text-2xl transform',
                'text-pink',
                '!transition-all',
                'lg:hover:scale-125'
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
