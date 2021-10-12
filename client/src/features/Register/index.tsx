import { useRouter } from 'next/dist/client/router';

// clsx
import clsx from 'clsx';

import { PATHS } from '@/constants';
import {
  ltBackground,
  dkBackground,
  rocket,
  ltDot,
  dkDot,
} from '@/utils/images';

import Meta from '@/layouts/Meta';
import RegisterForm from './components/RegisterForm';
import LandingLeft from '@/components/LandingLeft';

// styles
import styles from './styles.module.scss';

function Register() {
  const isDark = true;

  const router = useRouter();

  const moveToLogin = () => {
    router.push(PATHS.LOGIN);
  };

  return (
    <Meta title='Register'>
      <div
        className={clsx(
          'relative md:overflow-hidden',
          'grid grid-cols-1 lg:grid-cols-2 w-screen h-full lg:h-screen py-16 px-2.5 md:py-50 lg:py-0 lg:px-50',
          'lg:bg-center bg-cover bg-no-repeat'
        )}
        style={{
          backgroundImage: `url(${isDark ? dkBackground : ltBackground})`,
        }}>
        <LandingLeft />

        <div
          style={{ backgroundImage: `url(${isDark ? dkDot : ltDot})` }}
          className={clsx(
            'hidden lg:block',
            'bg-lt-cpn dark:bg-dk-cpn',
            styles.decoration
          )}
        />

        <div
          className={clsx(
            'relative',
            'i-flex-center flex-col w-full md:w-[424px] lg:w-[484px] mr-auto lg:mr-0 ml-auto lg:my-auto pt-12 pb-6 md:pb-8 px-5 md:px-10 lg:px-16 lg:py-16 rounded-lg shadow-lg',
            'bg-lt-cpn dark:bg-dk-cpn'
          )}>
          <img
            src={rocket}
            className={clsx('absolute -left-20 -top-8', 'hidden lg:block w-30')}
            alt='Label'
          />
          <h3
            className={clsx(
              'font-bold text-xl md:text-2xl',
              'dark:text-white'
            )}>
            Create your Account!
          </h3>

          <p className={clsx('text-xs mt-8 leading-6', 'dark:text-white')}>
            Already have an account? {''}
            <span
              onClick={moveToLogin}
              className={clsx(
                'font-bold',
                'text-primary-v2 dark:text-primary-v4',
                'cursor-pointer'
              )}>
              Login
            </span>
            !
          </p>

          <RegisterForm />
        </div>
      </div>
    </Meta>
  );
}

export default Register;
