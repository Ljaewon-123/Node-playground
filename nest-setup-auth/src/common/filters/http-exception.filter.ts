import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  // NestJS 내장 로거 사용
  private readonly logger = new Logger('HTTP_ERROR');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // 1. 맥락(Context) 정보 추출
    const { method, url, body, query, ip } = request;
    const user = (request as any).user; // 세션에 저장된 유저 정보
    const userId = user ? user.id : 'Guest';

    // 2. 로그 메시지 구성
    const logMessage = `
      [${method}] ${url} - Status: ${status}
      User ID: ${userId}
      IP: ${ip}
      Query: ${JSON.stringify(query)}
      Body: ${JSON.stringify(body)}
      Error Message: ${JSON.stringify(errorResponse)}
    `;

    // 3. 터미널에 에러 로그 출력
    // 500번대 에러는 error로, 그 외(400번대)는 warn으로 찍으면 구분하기 좋습니다.
    if (status >= 500) {
      this.logger.error(logMessage, exception.stack);
    } else {
      this.logger.warn(logMessage);
    }

    // 4. 클라이언트에게 보낼 응답 포맷 통일
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: url,
      message: (errorResponse as any).message || exception.message,
    });
  }
}