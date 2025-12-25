import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/entity/user.entity';
import { ROLES_KEY } from '../desorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. @Roles() 데코레이터에 설정된 역할 목록을 가져옴
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 설정된 역할이 없으면 누구나 접근 가능
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    
    // 2. 유저의 역할이 허용된 역할 목록에 포함되는지 확인
    const hasRole = requiredRoles.some((role) => user?.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException('해당 기능에 대한 권한이 없습니다.');
    }
    
    return true;
  }
}