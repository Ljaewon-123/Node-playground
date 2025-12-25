import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { DataSource } from 'typeorm';
import pgSession from 'connect-pg-simple';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. TypeORM DataSource 가져오기
  const dataSource = app.get(DataSource);
  
  // 2. PostgreSQL 드라이버에서 커넥션 풀 추출
  // TypeORM 드라이버 내부의 master 풀을 가져옵니다.
  const driver = dataSource.driver as any;
  const pool = driver.master || driver.pool;

  app.use(
    session({
      store: new (pgSession(session))({
        pool: pool, // 이제 동일한 풀을 공유합니다.
        tableName: 'session',
        createTableIfMissing: true,
      }),
      secret: 'my-secret', // .env에 넣는 것을 권장
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // 1시간
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
