import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@modules/auth/jwt.service';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    let accessToken: string;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      accessToken = req.cookies?.accessToken;
    }
    // 2.verification of Token
    if (!accessToken) throw new UnauthorizedException(`No Token Found`);

    try {
      const decodedToken = this.jwtService.verifyAccessToken(accessToken);

      const user = decodedToken?.user;

      if (!user?.id) throw new UnauthorizedException(`malicious/phishy token`);

      //3.check if the user exist in db
      const currentUser = await this.authService.getUserById(user?.id);

      if (!currentUser)
        throw new UnauthorizedException(`The user belonging to this token does no longer exists`);

      req.user = currentUser;
    } catch (error) {
      throw new UnauthorizedException(`You are not logged in`);
    }

    return true;
  }
}
