import { useEffect } from 'react';
import router from 'next/router';

import { PATHS } from '@/constants';
import { useAuthSelector } from '@/redux/selectors';

import Login from '@/features/Login';

function LoginPage() {
  const {
    authStatus: { isAuthenticated },
  } = useAuthSelector();

  useEffect(() => {
    if (isAuthenticated) router.push(PATHS.NEWSFEED);
  }, [isAuthenticated]);

  return <Login />;
}

export default LoginPage;
