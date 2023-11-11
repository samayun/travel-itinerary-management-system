import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { COOKIE_OPTIONS } from '@config/auth';
import { AuthGuard } from '@middleware/auth.guard';
import { SigninUserInput, SignupUserInput } from '@modules/users/user.input';
import { Controller, Post, Body, Req, Get, Res, UseGuards } from '@nestjs/common';

@Controller('v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupUserInput: SignupUserInput, @Res() res: Response) {
    const result = await this.authService.signup(signupUserInput);

    res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

    return res.json({ accessToken: result.accessToken });
  }

  @Post('login')
  async login(@Body() loginUserInput: SigninUserInput, @Res() res: Response) {
    const result = await this.authService.login(loginUserInput);

    res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

    return res.json({ accessToken: result.accessToken });
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.getUserById(req.user.id);
    return res.json(result);
  }

  @Get('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.refreshToken(req);

    res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

    return res.json({ accessToken: result.accessToken });
  }
}
