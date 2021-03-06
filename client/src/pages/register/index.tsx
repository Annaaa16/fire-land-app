import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

import { PATHS } from '@/constants';
import { useAuthSelector } from '@/redux/selectors';
import { authActions } from '@/redux/slices/authSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Meta from '@/layouts/Meta';
import RegisterForm from '@/features/register/components/RegisterForm';

import Auth from '@/layouts/Auth';

function Register() {
  const {
    registerStatus: { success },
  } = useAuthSelector();

  const dispatch = useStoreDispatch();
  const router = useRouter();

  const moveToLogin = () => {
    dispatch(authActions.clearMessage());
    router.push(PATHS.LOGIN);
  };

  useEffect(() => {
    if (success) {
      router.push(PATHS.LOGIN);
      dispatch(authActions.setLoginStatus(false));
    }
  }, [success, router, dispatch]);

  return (
    <Meta title='Register'>
      <Auth
        title='Create your Account!'
        question='Already have an account?'
        recommend='Login'
        onRedirect={moveToLogin}>
        <RegisterForm />
      </Auth>
    </Meta>
  );
}

export default Register;
