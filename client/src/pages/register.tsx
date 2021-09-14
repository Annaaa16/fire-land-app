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

function Register() {
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
          'i-flex-center flex-col w-full md:w-form-w mr-auto lg:mr-0 ml-auto lg:my-auto py-8 px-5 md:px-16 md:py-16 rounded-lg shadow-lg',
          'bg-lt-body dark:bg-dk-body'
        )}>
        <img
          src={rocket}
          className={clsx('absolute -left-20 -top-8', 'hidden lg:block w-30')}
          alt='Label'
        />
        <h3
          className={clsx(
            'font-bold text-xl md:text-2xl',
            'text-lt-text dark:text-dk-text'
          )}>
          Create your Account!
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
                Password
              </label>
            </div>
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
                Confirm Password
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
                  className={clsx('text-xs', 'text-lt-text dark:text-dk-text')}>
                  Send me news and updates via email
                </span>
              </label>
            </div>
          </div>

          <button
            type='submit'
            className={clsx(
              'w-full mt-7 font-bold shadow-md py-4 rounded-lg text-xs lg:text-sm',
              'text-white bg-primary-v1 dark:bg-primary-v4',
              'transition-all',
              'hover:bg-primary-v1-hover dark:hover:bg-primary-v4-hover'
            )}>
            Register Now!
          </button>
        </form>

        <p
          className={clsx(
            'text-xs mt-10 leading-6',
            'text-lt-text dark:text-dk-text'
          )}>
          You'll receive a confirmation email in your inbox with a link to
          activate your account. If you have any problems,{' '}
          <span
            className={clsx(
              'text-primary-v2 dark:text-primary-v4',
              'cursor-pointer'
            )}>
            contact us
          </span>
          !
        </p>
      </div>
    </div>
  );
}

export default Register;
