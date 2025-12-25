import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

export interface UserResponse {
  id: number;
  username: string;
  createdAt: string | Date; // ISO 문자열로 올 수도 있고 Date 객체일 수도 있음
}


// 사용자 정보를 세션에 저장하고(serialize), 세션에서 사용자 정보를 꺼내오는(deserialize) 로직입니다.
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService){
    super()
  }
  // 1. 로그인 성공 시: 세션에 유저의 "ID"만 저장합니다.
  serializeUser(user: UserResponse, done: (err: Error | null, id: any) => void) {
    console.log('Serialize:', user?.id); // 로그 찍히는지 확인
    done(null, user.id); 
  }

  // 2. 이후 요청 시: 세션에 저장된 "ID"를 꺼내와서 유저를 복원합니다.
  async deserializeUser(userId: string, done: (err: Error | null, payload: any) => void) {
    console.log('Deserialize ID:', userId); // 로그 찍히는지 확인
    
    const user = await this.userService.findById(Number(userId));

    console.log('FIND USER', user)

    done(null, user); 
  }
}