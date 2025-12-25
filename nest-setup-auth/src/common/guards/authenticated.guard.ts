import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Passport가 세션 정보를 바탕으로 세팅해준 메서드를 확인
    const isAuthenticated = request.isAuthenticated();
    
    if (!isAuthenticated) {
      // 401 에러를 던져서 핸들러 실행을 막음
      throw new UnauthorizedException('로그인이 필요한 서비스입니다.');
    }
    
    return true;
  }
}