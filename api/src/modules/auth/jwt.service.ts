import fs from 'fs';
import jwt from 'jsonwebtoken';
import { authConfig } from '@config/auth';

export class JwtService {
  /**
   * createToken using RS512 algorithm.
   * It uses file based key if authConfig.key.isFile is true
   * @param user: TAuthUser
   * @returns string
   * */

  generateAccessToken<T>(user: T, role: string) {
    return jwt.sign(
      { user, role },
      authConfig.passphrase,
      {
        algorithm: 'RS256',
        expiresIn: authConfig.accessToken.expiresIn,
        issuer: authConfig.accessToken.issuer,
      },
    );
  }

  generateRefreshToken<T>(user: T, role: string) {
    return jwt.sign(
      { user, role },
      authConfig.passphrase,
      {
        algorithm: 'RS256',
        expiresIn: authConfig.refreshToken.expiresIn,
        issuer: authConfig.refreshToken.issuer,
      },
    );
  }

  /**
   * verify jwt Token using RS512 algorithm
   * @param token: string
   * @returns TVerifiedAuthToken
   * */

  verifyAccessToken(token: string) {
    return jwt.verify(
      token,
      authConfig.passphrase,
      {
        algorithms: ['RS512'],
        issuer: authConfig.accessToken.issuer,
      },
    );
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(
      token,
      authConfig.passphrase,
      {
        algorithms: ['RS512'],
        issuer: authConfig.accessToken.issuer,
      },
    );
  }
}
