import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super();
  }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 전략 실행 (ID/PW 검증) - 결과가 Observable이나 Promise일 수 있으므로 처리
    const result = (await super.canActivate(context)) as boolean;
    
    // 2. HTTP 요청 객체 꺼내기
    const request = context.switchToHttp().getRequest();

    // 3. 세션 저장 (가장 중요한 부분!)
    // super.logIn을 호출해야 SessionSerializer가 작동합니다.
    await super.logIn(request);

    return result;
  }
}