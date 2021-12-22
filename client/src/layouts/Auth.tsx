// clsx
import clsx from 'clsx';

// types
import { ReactNode } from 'react';

import { LOCAL_STORAGE } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';

// images
import {
  ltBackground,
  dkBackground,
  rocket,
  ltDot,
  dkDot,
} from '@/utils/cloudinaryImages';

// svgs
import logo from '@/assets/svgs/logo.svg';

interface AuthProps {
  title: string;
  question: string;
  recommend: string;
  children: ReactNode;
  onRedirect: () => void;
}

function Auth(props: AuthProps) {
  const { title, question, recommend, children, onRedirect } = props;

  const { theme } = useGlobalContext();

  return (
    <div
      className={clsx(
        'relative md:overflow-hidden',
        'grid grid-cols-1 lg:grid-cols-2 w-screen h-full lg:h-screen py-16 px-2.5 md:py-50 lg:py-0 lg:px-50',
        'lg:bg-center bg-cover bg-no-repeat'
      )}
      style={{
        backgroundImage: `url(${
          theme === LOCAL_STORAGE.DARK_THEME_VALUE ? dkBackground : ltBackground
        })`,
      }}>
      <div className={clsx('flex-center flex-col text-center mb-8 lg:mb-0')}>
        <h3
          className={clsx(
            'font-semibold text-xl lg:text-2xl mb-5',
            'text-white'
          )}>
          WELCOME TO
        </h3>
        <img
          src={logo.src}
          alt='Logo'
          loading='lazy'
          className={clsx('w-36 mb-2', 'cursor-pointer select-none')}
        />
        <p className='hidden lg:block text-white mt-2 leading-6 text-sm px-10'>
          The next generation social network & community! Connect with your
          friends and play with our quests and badges gamification system!
        </p>
      </div>

      <div
        style={{
          backgroundImage: `url(${
            theme === LOCAL_STORAGE.DARK_THEME_VALUE ? dkDot : ltDot
          })`,
        }}
        className={clsx(
          'absolute right-[-32%] top-[-20%]',
          'hidden lg:block rounded-[50%] h-[140%] w-[64%]',
          'bg-white dark:bg-dk-cpn'
        )}
      />

      <div
        className={clsx(
          'relative',
          'flex-center flex-col w-full md:w-[424px] lg:w-[484px] lg:min-h-[625px] lg:max-h-[685px] mr-auto lg:mr-0 ml-auto lg:my-auto pt-12 pb-6 md:pb-8 px-5 md:px-10 lg:px-16 lg:py-16 rounded-lg shadow-lg',
          'bg-white dark:bg-dk-cpn'
        )}>
        <img
          src={rocket}
          className={clsx('absolute -left-20 -top-16', 'hidden lg:block w-30')}
          alt='Label'
        />
        <h3 className={clsx('font-semibold text-2xl', 'dark:text-white')}>
          {title}
        </h3>

        <p className={clsx('text-xs mt-8 leading-6', 'dark:text-white')}>
          {question} {''}
          <span
            onClick={onRedirect}
            className={clsx(
              'font-semibold',
              'text-primary-v2 dark:text-primary-v4',
              'cursor-pointer'
            )}>
            {recommend}
          </span>
          !
        </p>

        {children}
      </div>
    </div>
  );
}

export default Auth;
