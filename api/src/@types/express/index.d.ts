import { User } from '@models/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'staging' | 'production';
      PORT: number;
      
      DB_URL: string;
      FRONTEND_URLS: string;

      SWAGGER_TITLE?: string;
      SWAGGER_DESCRIPTION?: string;
    }
  }
}
