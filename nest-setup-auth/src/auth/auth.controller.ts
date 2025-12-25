import { Controller, Post, UseGuards, Request, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

// 1. 세션에 담길 유저 타입 정의
interface AuthUser {
  id: number;
  username: string;
}

@Controller('auth')
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: ExpressRequest) {
    const user = req.user as AuthUser;
    // 가드가 성공하면 req.user는 이미 채워져 있습니다.
    // 하지만 세션 생성을 위해 명시적으로 logIn을 호출합니다. (Passport가 제공하는 함수)
    return new Promise((resolve, reject) => {
      req.logIn(user, (err) => {
        if (err) {
          console.error('세션 생성 에러:', err);
          return reject(err);
        }
        console.log('세션 생성 성공! DB를 확인하세요.');
        return resolve({ message: '로그인 성공', user: req.user });
      });
    });
  }

  @Get('logout')
  logout(@Request() req: ExpressRequest) {
    // 1. 세션 파괴 (DB에서 해당 세션 삭제)
    req.session.destroy((err) => {
      if (err) {
        // 에러 처리 (로그 출력 등)
        console.error('세션 삭제 중 에러 발생:', err);
        return { message: '로그아웃 실패' };
      }
    });

    // 2. 클라이언트의 쿠키 삭제 요청 (선택 사항이지만 권장)
    // 보통은 세션이 파괴되면 쿠키가 있어도 서버에서 인증이 안 되지만, 
    // 클라이언트 브라우저에서도 쿠키를 지우도록 명시할 수 있습니다.
    return { message: '로그아웃 성공' };
  }

  @Get('profile')
  getProfile(@Request() req : ExpressRequest) {
    if (!req.isAuthenticated()) return { message: '로그인 필요' };
    return req.user;
  }
}