import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHasher } from '../auth/utils/password.util';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 회원가입
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    // 중복 유저 체크
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    // 내장 crypto를 이용한 비밀번호 암호화
    const hashedPassword = PasswordHasher.hash(password);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  // Auth/Strategy에서 사용: 유저 조회
  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}