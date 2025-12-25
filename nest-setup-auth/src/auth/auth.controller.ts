import { Controller, Post, UseGuards, Request, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  login(@Request() req) {
    return { message: '로그인 성공', user: req.user };
  }

  @Get('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { message: '로그아웃 성공' };
  }

  @Get('profile')
  getProfile(@Request() req) {
    if (!req.isAuthenticated()) return { message: '로그인 필요' };
    return req.user;
  }
}