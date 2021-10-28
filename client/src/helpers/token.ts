// jsonwebtoken
import jwt from 'jsonwebtoken';

import { SECRETS } from '@/constants';

const token = {
  verifyToken: (accessToken: string) => {
    if (!accessToken) {
      return { isValid: false, isExpired: false };
    }

    return jwt.verify(accessToken, SECRETS.ACCESS_TOKEN!, (error, decoded) => {
      if (error) {
        return { isValid: false, isExpired: false };
      }

      const tokenExp = decoded?.tokenExp;

      // Expired token
      return new Date().getTime() >= new Date(tokenExp).getTime()
        ? { isValid: true, isExpired: true }
        : { isValid: true, isExpired: false };
    });
  },
};

export default token;
