// clsx
import clsx from 'clsx';

import RegisterForm from './components/RegisterForm';

import {
  ltBackground,
  darkBackground,
  rocket,
  ltDot,
  dkDot,
} from '@/utils/imagesLogin';
import logo from '@/assets/svgs/common/logo.svg';

import styles from './styles.module.scss';
import Meta from '@/layouts/Meta';

function Register() {
  return (
    <Meta title='Register'>
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

          <RegisterForm />

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
    </Meta>
  );
}

export default Register;
