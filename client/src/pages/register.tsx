import { useEffect } from 'react';
import router from 'next/router';

import { PATHS } from '@/constants';
import { useAuthSelector } from '@/redux/selectors';

import Register from '@/features/Register';

function RegisterPage() {
  const {
    registerStatus: { success },
  } = useAuthSelector();

  useEffect(() => {
    if (success) router.push(PATHS.LOGIN);
  }, [success]);

  return <Register />;
}

export default RegisterPage;
