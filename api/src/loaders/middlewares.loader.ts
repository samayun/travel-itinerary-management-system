import cors from 'cors';
// import helmet from 'helmet';
import morgan from 'morgan';
import config from '@config';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';

const corsOptions = {
  origin: config.cors.origin,
  credentials: true,
};

const middlewares = [
  cookieParser(),
  cors(corsOptions),
  express.json({ limit: '2048mb' }),
  express.urlencoded({
    limit: '2048mb',
    extended: false,
  }),
  // helmet({ referrerPolicy: { policy: 'no-referrer' } }),
  compression(),
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(
    morgan('dev')
  );
}

export const loadGlobalMiddlewares = (app: INestApplication) =>
  middlewares.forEach((middleware) => app.use(middleware));
