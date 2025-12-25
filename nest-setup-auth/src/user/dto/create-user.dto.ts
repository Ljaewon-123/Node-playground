import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(4, { message: '비밀번호는 4자 이상이어야 합니다.' })
  password: string;
}