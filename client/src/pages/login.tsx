import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { PATHS } from '@/constants';
import { authState$ } from '@/redux/selectors';

import Login from '@/features/Login';

function LoginPage() {
  const {
    currentUser: { isAuthenticated },
  } = useSelector(authState$);

  useEffect(() => {
    if (isAuthenticated) router.push(PATHS.NEWSFEED);
  }, [isAuthenticated]);

  return <Login />;
}

export default LoginPage;
