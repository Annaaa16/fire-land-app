// types
import { NextPageContext } from 'next';
import { AxiosResponse } from 'axios';
import { GetUserResponse } from '@/models/users';

import { PATHS } from '@/constants';
import { usersApiServer } from '@/apis/usersApi';
import tokens from './tokens';

const fetchUserFromServer = async (ctx: NextPageContext) => {
  const path = ctx.pathname;

  const { isMissing } = tokens.checkTokenMissing(ctx);
  const isAuthPath = path === PATHS.LOGIN || path === PATHS.REGISTER;

  if (!isAuthPath && !isMissing) {
    const { getCurrentUser } = usersApiServer(ctx);
    const currentUser =
      (await getCurrentUser()) as AxiosResponse<GetUserResponse>;

    return currentUser.data;
  }
};

export default fetchUserFromServer;
