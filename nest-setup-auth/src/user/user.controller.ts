import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup') // 최종 주소: POST /user/signup
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    
    // 보안을 위해 응답에서 비밀번호는 제외하고 보냅니다.
    return {
      message: '회원가입 성공',
      data: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      },
    };
  }
}