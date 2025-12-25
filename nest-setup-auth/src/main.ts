import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { DataSource } from 'typeorm';
// import pgSession from 'connect-pg-simple';
import * as connectPgSimple from 'connect-pg-simple';
import { ConfigService } from '@nestjs/config';

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
