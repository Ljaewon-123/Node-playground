import { Injectable } from '@nestjs/common';
import { PasswordHasher } from './utils/password.util';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    
    if (user) {
      // 내장 crypto를 이용한 비교
      const isMatch = PasswordHasher.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}