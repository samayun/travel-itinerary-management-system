import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Request } from 'express';
import { JwtService } from './jwt.service';
import { AccessTokenType } from './auth.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@models/user.entity';
import { Global, HttpException, Injectable } from '@nestjs/common';
import { SignupUserInput, SigninUserInput } from '@modules/users/user.input';

@Global()
@Injectable()
export class AuthService extends JwtService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
    super();
  }

  generateToken(user: Record<string, any>, role: string): AccessTokenType {
    const payload = {
      id: user.id,
      _id: user._id,
      name: user.name,
      role: user.role,
      organization: user?.organization,
      // userType: user?.userType,
      // device_id: user?.device_id,
      registrationCompleted: user?.registrationCompleted,
    };
    return {
      accessToken: this.generateAccessToken(payload, role),
      refreshToken: this.generateRefreshToken(payload, role),
    };
  }

  verifyToken(token: string) {
    return this.verifyAccessToken(token);
  }

  decodeRefreshToken(token: string) {
    return this.verifyRefreshToken(token);
  }

  async signup(signupUserInput: SignupUserInput) {
    const userExists = await this.UserModel.findOne({
      email: signupUserInput.email,
    });

    if (userExists) throw new HttpException(`User exists`, 403);

    const createdUser = new this.UserModel(signupUserInput);
    createdUser.password = bcrypt.hashSync(signupUserInput.password, 10);

    const user = await createdUser.save();

    return this.generateToken(user, 'user');
  }

  async login(signinUserInput: SigninUserInput) {
    const user = await this.UserModel.findOne({ email: signinUserInput.email });

    if (!user) throw new HttpException(`User doesn't exist`, 404);

    const matched = bcrypt.compareSync(signinUserInput.password, user.password);

    if (!matched) throw new HttpException(`Password doesn't match`, 404);

    return this.generateToken(user, 'user');
  }

  async profile(req: Request): Promise<UserDocument> {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) throw new HttpException(`No Token Found`, 404);

    const decodedToken: any = this.verifyToken(accessToken);

    const user = decodedToken?.user;

    if (!user?.id) throw new HttpException(`No User Found`, 404);

    return this.getUserById(user?.id);
  }

  async getUserById(id: string) {
    const dbUser = await this.UserModel.findById(id);

    if (!dbUser) throw new HttpException(`No User Found`, 404);

    return dbUser;
  }

  async refreshToken(req: Request) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new HttpException(`No Token Found`, 404);

    const token: any = this.decodeRefreshToken(refreshToken);

    const user = token?.user;

    if (!user?.id) throw new HttpException(`No User Found`, 404);

    const dbUser = await this.UserModel.findById(user.id);

    if (!dbUser) throw new HttpException(`No db User Found`, 404);

    return this.generateToken(dbUser, dbUser.role);
  }

  async logout(res: any) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'logout success';
  }
}
