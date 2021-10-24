import { useRouter } from 'next/dist/client/router';

// clsx
import clsx from 'clsx';

import { LOCAL_STORAGE } from '@/constants';
import { clearMessage } from '@/redux/slices/authSlice';
import { useGlobalContext } from '@/contexts/GlobalContext';
import useStoreDispatch from '@/hooks/useStoreDispatch';

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
} from '@/utils/images';

import styles from './styles.module.scss';

function Login() {
  const { theme } = useGlobalContext();

  const router = useRouter();
  const dispatch = useStoreDispatch();

  const moveToRegister = () => {
    dispatch(clearMessage());
    router.push('/register');
  };

  return (
    <Meta title='Login'>
      <div
        className={clsx(
          'relative md:overflow-hidden',
          'grid grid-cols-1 lg:grid-cols-2 w-screen h-full lg:h-screen py-16 px-2.5 md:py-50 lg:py-0 lg:px-50',
          'lg:bg-center bg-cover bg-no-repeat'
        )}
        style={{
          backgroundImage: `url(${
            theme === LOCAL_STORAGE.DARK_THEME_VALUE
              ? dkBackground
              : ltBackground
          })`,
        }}>
        <LandingLeft />

        <div
          style={{
            backgroundImage: `url(${
              theme === LOCAL_STORAGE.DARK_THEME_VALUE ? dkDot : ltDot
            })`,
          }}
          className={clsx(
            'hidden lg:block',
            'bg-lt-cpn dark:bg-dk-cpn',
            styles.decoration
          )}
        />

        <div
          className={clsx(
            'relative',
            'i-flex-center flex-col w-full md:w-[424px] lg:w-[484px] lg:h-[625px] mr-auto lg:mr-0 ml-auto lg:my-auto pt-12 pb-6 md:pb-8 px-5 md:px-10 lg:px-16 lg:py-16 rounded-lg shadow-lg',
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
          <h3 className={clsx('font-bold text-2xl', 'dark:text-white')}>
            Account Login
          </h3>

          <p className={clsx('text-xs mt-8 leading-6', 'dark:text-white')}>
            Don't have an account? {''}
            <span
              onClick={moveToRegister}
              className={clsx(
                'font-bold',
                'text-primary-v2 dark:text-primary-v4',
                'cursor-pointer'
              )}>
              Create new Account
            </span>
            !
          </p>

          <LoginForm />
          <LoginSocial />
        </div>
      </div>
    </Meta>
  );
}

export default Login;
