import { Controller, Post, UseGuards, Request, Get, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/user/entity/user.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';

// 1. 세션에 담길 유저 타입 정의
interface AuthUser {
  id: number;
  username: string;
}

@Controller('auth')
export class AuthController {

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: ExpressRequest) {
    const user = req.user as AuthUser;
    return { 
      message: '로그인 성공', 
      user 
    };
  }

  @Post('logout')
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

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req : ExpressRequest) {
    return req.user;
  }

  @Get('admin-only')
  @UseGuards(AuthenticatedGuard, RolesGuard) // 1. 로그인 확인 -> 2. 권한 확인
  @Roles(UserRole.ADMIN) // admin 역할만 허용
  getAdminData() {
    return { message: '어드민 전용 데이터입니다.' };
  }

  @Get('public')
  notNeedLogin() {
    return { message: '로그인 없어도 가능.' };
  }
}