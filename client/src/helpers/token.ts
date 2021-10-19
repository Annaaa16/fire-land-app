// jsonwebtoken
import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET } from '@/constants';

const token = {
  verifyToken: (accessToken: string) => {
    if (!accessToken) {
      return { isValid: false, isExpired: false };
    }

    return jwt.verify(accessToken, ACCESS_TOKEN_SECRET!, (error, decoded) => {
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
