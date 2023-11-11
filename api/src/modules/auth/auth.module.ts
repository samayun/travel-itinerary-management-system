import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserForFeature } from '@models/user.entity';

@Global()
@Module({
  imports: [MongooseModule.forFeature([UserForFeature])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService, MongooseModule.forFeature([UserForFeature])],
})
export class AuthModule {}
