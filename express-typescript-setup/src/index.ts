import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user'; // 라우터 불러오기

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정: POST 요청 시 JSON 바디를 읽기 위함
app.use(express.json());

// API 라우트 등록
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript 서버가 정상 작동 중입니다!');
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});