// types
import { NextPageContext } from 'next';

import { PATHS } from '@/constants';
import { usersApiServer } from '@/apis/usersApi';
import tokens from './tokens';

export const fetchUserFromServer = async (ctx: NextPageContext) => {
  const path = ctx.pathname;

  const { isMissing } = tokens.checkTokenMissing(ctx);
  const isAuthPath = path === PATHS.LOGIN || path === PATHS.REGISTER;

  if (isAuthPath || isMissing) return;

  const { getCurrentUser } = usersApiServer(ctx);

  return await getCurrentUser();
};

export const redirectToNotFound = () => ({
  redirect: {
    destination: PATHS.NOT_FOUND,
    permanent: false,
  },
});
