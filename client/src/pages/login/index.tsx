import { PATHS } from '@/constants';
import { authActions } from '@/redux/slices/authSlice';
import { useAuthSelector } from '@/redux/selectors';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Meta from '@/layouts/Meta';
import LoginForm from '@/features/Login/components/LoginForm';
import LoginSocial from '@/features/Login/components/LoginSocial';

import Auth from '@/layouts/Auth';

function Login() {
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const {
    loginStatus: { isAuthenticated },
  } = useAuthSelector();

  const moveToRegister = () => {
    dispatch(authActions.clearMessage());
    router.push(PATHS.REGISTER);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(PATHS.NEWSFEED);
    }
  }, [isAuthenticated, router]);

  return (
    <Meta title='Login'>
      <Auth
        title='Account Login'
        question="Don't have an account?"
        recommend='Create new Account'
        onRedirect={moveToRegister}>
        <LoginForm />
        <LoginSocial />
      </Auth>
    </Meta>
  );
}

export default Login;
