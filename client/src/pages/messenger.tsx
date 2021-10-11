// types
import { GetServerSideProps } from 'next';
import { LoginResponse } from '@/models/login';
import { ErrorResponse } from '@/models/common';

import { wrapper } from '@/redux/store';
import { setUser } from '@/redux/slices/authSlice';
import { authApiServer } from '@/apis/authApi';

import Messenger from '@/features/Messenger';

function MessengerPage() {
  return <Messenger />;
}

export default MessengerPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { reqGetCurrentUser } = authApiServer(ctx);

    const { data } = (await reqGetCurrentUser()) as {
      data: LoginResponse | ErrorResponse;
      accessToken: string;
    };

    store.dispatch(setUser(data as LoginResponse));

    return {
      props: {},
    };
  });
