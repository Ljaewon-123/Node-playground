import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users - 모든 유저 조회
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: "유저 목록을 가져왔습니다."
  });
});

// POST /api/users - 유저 생성
router.post('/', (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).json({
    message: `${name} 유저가 생성되었습니다.`
  });
});

export default router;