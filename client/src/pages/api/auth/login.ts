// cookie
import cookie from 'cookie';

// types
import type { NextApiRequest, NextApiResponse } from 'next';

import { COOKIES } from '@/constants';
import { authApiClient } from '@/apis/authApi';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { loginUser } = authApiClient();

  const { username, password } = req.body;

  const { accessToken, refreshToken, cookieOptions, ...rest } = await loginUser(
    {
      username,
      password,
    }
  );

  res.setHeader('Set-Cookie', [
    cookie.serialize(COOKIES.ACCESS_TOKEN_KEY, accessToken, cookieOptions),
    cookie.serialize(COOKIES.REFRESH_TOKEN_KEY, refreshToken, cookieOptions),
  ]);

  res.status(200).json(rest);
};

export default login;
