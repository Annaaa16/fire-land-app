// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import LoginForm from './components/LoginForm';
import LoginSocial from './components/LoginSocial';
import LandingLeft from '@/components/LandingLeft';

import {
  ltBackground,
  dkBackground,
  rocket,
  ltDot,
  dkDot,
} from '@/utils/imagesLogin';

import styles from './styles.module.scss';

function Login() {
  const isDark = true;

  return (
    <Meta title='Login'>
      <div
        className={clsx(
          'relative md:overflow-hidden',
          'grid grid-cols-1 lg:grid-cols-2 w-screen h-full lg:h-screen py-16 px-5 md:py-50 lg:py-0 lg:px-50',
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
            'i-flex-center flex-col w-full md:w-form-w lg:h-form-h mr-auto lg:mr-0 ml-auto lg:my-auto py-8 px-5 md:px-16 lg:py-16 rounded-lg shadow-lg',
            'bg-lt-cpn dark:bg-dk-cpn'
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
