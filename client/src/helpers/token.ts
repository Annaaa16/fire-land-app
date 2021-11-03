// jwt decode
import jwt_decode from 'jwt-decode';

// types
import { JwtPayload } from 'jwt-decode';

const token = {
  verifyToken: (accessToken: string) => {
    try {
      const decoded: JwtPayload = jwt_decode(accessToken);

      if (decoded.exp) {
        const isExpired = new Date().getTime() >= decoded.exp * 1000;

        return { isExpired };
      }
    } catch (error) {
      return { isExpired: true };
    }
  },
};

export default token;
