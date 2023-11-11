import { UsersService } from './users.service';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserForFeature } from '@models/user.entity';
import { UsersController } from './users.controller';

@Global()
@Module({
  imports: [MongooseModule.forFeature([UserForFeature])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
