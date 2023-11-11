import { env } from '@config';
import { CookieOptions } from 'express';

export const authConfig = {
  passphrase: env<string>('AUTH_KEY_PASSPHRASE', 'travel-itinerary-v1'),

  accessToken: {
    secret: env<string>('ACCESS_TOKEN_SECRET', 'ACCESS_TOKEN_SECRET'),
    expiresIn: env<string>('ACCESS_TOKEN_EXPIRATION', '10m'),
    issuer: env<string>('AUTH_ISSUER', 'travel-itinerary'),
  },
  refreshToken: {
    secret: env<string>('REFRESH_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'),
    expiresIn: env<string>('REFRESH_TOKEN_EXPIRATION', '7d'),
    issuer: env<string>('AUTH_ISSUER', 'travel-itinerary'),
  },
};

export const COOKIE_DOMAIN = env<string>('COOKIE_DOMAIN', '');

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  domain: COOKIE_DOMAIN,
  secure: true,
  sameSite:
    process.env.NODE_ENV === 'production'
      ? 'strict'
      : process.env.NODE_ENV === 'staging'
      ? 'lax'
      : 'none',
};
