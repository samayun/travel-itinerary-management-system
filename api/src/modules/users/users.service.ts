import { Model } from 'mongoose';
import { User } from '@models/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '@models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    // password hash
    return this.UserModel.create(createUserDto);
  }

  async findAll() {
    const result = await this.UserModel.find({});
    return result;
  }

  async findOne(userId: string) {
    const user = await this.UserModel.findById(userId);

    if (!user) throw new HttpException(`User not found`, 404);

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(userId, updateUserDto);
  }

  async remove(userId: string) {
    return this.UserModel.findByIdAndDelete(userId);
  }
}
