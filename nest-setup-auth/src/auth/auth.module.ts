import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService,
    LocalStrategy,    // ★ 여기가 핵심! 여기에 등록되어야 "local" 전략이 활성화됩니다.
    SessionSerializer
  ]
})
export class AuthModule {}
