import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { PATHS } from '@/constants';
import { authState$ } from '@/redux/selectors';

import Register from '@/features/Register';

function RegisterPage() {
  const {
    registerStatus: { success },
  } = useSelector(authState$);

  useEffect(() => {
    if (success) router.push(PATHS.LOGIN);
  }, [success]);

  return <Register />;
}

export default RegisterPage;
