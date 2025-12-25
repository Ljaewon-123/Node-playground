import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from 'src/user/entity/user.entity';

// main.ts에 있던 설정을 그대로 가져옵니다.
function setupSession(app: INestApplication) {
  app.use(
    session({
      secret: 'test-secret', // 테스트용 시크릿
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

describe('Auth & Roles (e2e)', () => {
  let app: INestApplication;
  let agent: any;
  let userRepository: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupSession(app); // 아까 만든 세션 설정 함수
    await app.init();

    agent = request.agent(app.getHttpServer());
    userRepository = moduleFixture.get(getRepositoryToken(User));
  });

  // 1. 회원가입 테스트
  it('/auth/signup (POST)', async () => {
    return agent
      .post('/user/signup') // 유저 생성 경로
      .send({ username: 'adminuser', password: 'password123' })
      .expect(201);
  });

  // 2. 관리자 권한 부여 (테스트용 DB를 직접 수정)
  it('유저에게 ADMIN 권한 부여', async () => {
    await userRepository.update({ username: 'adminuser' }, { role: UserRole.ADMIN });
    const user = await userRepository.findOne({ where: { username: 'adminuser' } });
    expect(user.role).toBe(UserRole.ADMIN);
  });

  // 3. 로그인 테스트
  it('/auth/login (POST) - 성공 및 쿠키 획득', async () => {
    const response = await agent
      .post('/auth/login')
      .send({ username: 'adminuser', password: 'password123' })
      .expect(200);

    expect(response.header['set-cookie']).toBeDefined();
    expect(response.body.user.username).toBe('adminuser');
  });

  // 4. 권한 체크 테스트
  it('/auth/admin-only (GET) - 관리자 접근 성공', async () => {
    return agent
      .get('/auth/admin-only')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('어드민 전용 데이터입니다.');
      });
  });

  afterAll(async () => {
    // 테스트용 유저 삭제 및 DB 정리
    // 방법 2: clear() 사용 (가장 추천)
    await userRepository.clear();
    await app.close();
  });
});