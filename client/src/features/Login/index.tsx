// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import LoginForm from './components/LoginForm';
import LoginSocial from './components/LoginSocial';

import {
  ltBackground,
  darkBackground,
  rocket,
  ltDot,
  dkDot,
} from '@/utils/imagesLogin';
import logo from '@/assets/svgs/common/logo.svg';

import styles from './styles.module.scss';

function Login() {
  return (
    <Meta title='Login'>
      <div
        className={clsx(
          'relative md:overflow-hidden dark',
          'grid grid-cols-1 lg:grid-cols-2 w-screen h-full lg:h-screen py-16 px-5 md:py-50 lg:py-0 lg:px-50',
          'lg:bg-center bg-cover bg-no-repeat'
        )}
        style={{ backgroundImage: `url(${darkBackground})` }}>
        <div
          className={clsx('i-flex-center flex-col text-center mb-8 lg:mb-0')}>
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
            className={clsx(
              'absolute -left-20 -top-16',
              'hidden lg:block w-30'
            )}
            alt='Label'
          />
          <h3
            className={clsx(
              'font-bold text-2xl',
              'text-lt-text dark:text-dk-text'
            )}>
            Account Login
          </h3>

          <LoginForm />
          <LoginSocial />
        </div>
      </div>
    </Meta>
  );
}

export default Login;
