import config from '@config';
/* eslint-disable prettier/prettier */
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { JwtService } from '@modules/auth/jwt.service';
import { AuthModule } from '@modules/auth/auth.module';
import { Global, Logger, Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config.db.url),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {
  onApplicationBootstrap() {
    Logger.verbose(`>> DB Connected : ${config.db.url} 🔵`);

    if (process.env.NODE_ENV === 'development') {
      Logger.verbose(
        `> Documentation is here => ${config.server.host}:${config.server.port}/${config.api.swaggerPrefix} 🟢`,
      );
    }
  }
}
