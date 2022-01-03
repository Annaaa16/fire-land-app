import { PATHS } from '@/constants';
import { authActions } from '@/redux/slices/authSlice';
import { useAuthSelector } from '@/redux/selectors';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Meta from '@/layouts/Meta';
import Auth from '@/layouts/Auth';
import LoginForm from '@/features/Login/components/LoginForm';
import LoginSocial from '@/features/Login/components/LoginSocial';

function Login() {
  const {
    loginStatus: { success },
  } = useAuthSelector();

  const router = useRouter();
  const dispatch = useStoreDispatch();

  const moveToRegister = () => {
    dispatch(authActions.clearMessage());
    router.push(PATHS.REGISTER);
  };

  useEffect(() => {
    if (success) {
      router.push(PATHS.NEWSFEED);
      dispatch(authActions.setRegisterStatus(false));
    }
  }, [success, router, dispatch]);

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
