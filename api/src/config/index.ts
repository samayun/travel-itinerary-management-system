export function env<T>(key: string, defaultValue: string | number = '') {
  return (process.env[key] as unknown as T) || (defaultValue as unknown as T);
}

const config = {
  server: {
    host: env<string>('HOST', 'http://localhost'),
    port: env<number>('PORT', 5000),
  },

  cors: {
    origin: (process.env.UI as string)?.split(',') || '*',
  },

  api: {
    globalPrefix: env<string>('API_PREFIX', 'api'),
    version: env<string>('API_VERSION', 'v1'),
    swaggerPrefix: env<string>('SWAGGER_PREFIX', 'docs'),
  },

  db: {
    url: env<string>('DB_URL', ''),
    entities: ['dist/entities/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
  },

  swagger: {
    title: env<string>('SWAGGER_TITLE', 'travel-itinerary API'),
    description: env<string>(
      'SWAGGER_DESCRIPTION',
      'User mircroservice with auth,role-permission,user management etc',
    ),
  },

};

export default config;
export { config };

process.env.NODE_ENV === 'development' && console.log(config);
