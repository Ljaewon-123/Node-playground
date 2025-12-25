import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
// import pgSession from 'connect-pg-simple';
import * as connectPgSimple from 'connect-pg-simple';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const HOUR_1 = 360_0000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // 1. TypeORM DataSource 가져오기
  const dataSource = app.get(DataSource);
  
  // 2. PostgreSQL 드라이버에서 커넥션 풀 추출
  // TypeORM 드라이버 내부의 master 풀을 가져옵니다.
  const driver = dataSource.driver as any;
  const pool = driver.master || driver.pool;

  const PgSessionStore = connectPgSimple(session);

  console.log('Postgres Pool exists:', !!pool); // 이게 false면 세션 저장이 안 됩니다.

  app.use(
    session({
      store: new PgSessionStore({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true,
      }),
      secret: configService.get<string>('SESSION_SECRET') || 'DEV-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: HOUR_1,
        httpOnly: true,
        secure: false, // 로컬(http) 테스트 시 반드시 false여야 함
        sameSite: 'lax', // 쿠키 전달 정책
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('과제 API 타이틀')
    .setDescription('과제 설명 (예: 로그인 및 권한 관리 시스템)')
    .setVersion('1.0')
    .addCookieAuth('connect.sid') // 세션 쿠키 인증 사용 시 설정
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config, { deepScanRoutes: true });
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // 인증 유지
      displayRequestDuration: true, // API 응답 시간 표시 (성능 확인용 꿀팁)
      filter: true, // API가 많아질 때 검색창 활성화
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
