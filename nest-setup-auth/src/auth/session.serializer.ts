import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

// 사용자 정보를 세션에 저장하고(serialize), 세션에서 사용자 정보를 꺼내오는(deserialize) 로직입니다.
@Injectable()
export class SessionSerializer extends PassportSerializer {
  // 로그인 성공 시 세션에 사용자 ID 저장
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user);
  }

  // 요청마다 세션의 정보를 바탕으로 사용자 객체 복원
  deserializeUser(payload: any, done: (err: Error | null, payload: any) => void): any {
    done(null, payload);
  }
}