import { BadRequestException, Controller, Get, Inject, Param, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './http/http.filter';
import { CatchEverythingFilter } from './catch-all/catch-all.filter';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Controller()
export class AppController {
  private readonly nestLogger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: WinstonLogger
  ) {}

  @Get()
  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(CatchEverythingFilter)
  getHello(): string {
    console.log('hi nuxt')
    throw new BadRequestException('Bad Request Error')
  }
  // {
  //   "message": "Bad Request Error",
  //   "error": "Bad Request",
  //   "statusCode": 400
  // }

  @Get('non-text')
  nonText(): string {
    throw new BadRequestException()
  }
  // {
  //   "message": "Bad Request",
  //   "statusCode": 400
  // }

  @Get('unexpected-error')
  // @UseFilters(new HttpExceptionFilter())
  unexpectedError(@Param('id') id: number) {
    return id.toFixed(2)
  }

  @Get('winston')
  winstonError() {
    // 둘다 모양은 똑같다. 
    this.nestLogger.log('Creating user...');
    this.winstonLogger.error('User creation failed', {
      context: 'UserService',
      error: "error.message",
      stack: "error.stack",
      userData: "data"
    });
    throw new BadRequestException()
  }

  @Get('variable')
  variableWinstonError() {
    // 둘다 모양은 똑같다. 
    this.winstonLogger.debug('hello debug');
    this.winstonLogger.log({ level: 'info', message: 'jho' });
    this.winstonLogger.error('hello error');
    this.winstonLogger.warn('hello warn');
    this.winstonLogger.verbose('hello verbose');
  }

  @Get('error-cause')
  errorCause(): string {
    throw new BadRequestException('Bad Request Error',
      {
        cause: new Error("Some like that"),
        description: 'Some error description',
      }
    )
  }


  @Get('test')
  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(CatchEverythingFilter)
  getTest(): string {
    throw new Error('Just some error!!')
  }


  // 이러면 에러랑 구분못해 
  @Get('service-error')
  // @UseFilters(new HttpExceptionFilter())
  serviceError() {
    try {
      return this.appService.buildInError()
    } catch (error) {
      console.error(error)
      return '뭐요'
    }
  }

  // 프로덕트 레벨에서도 확인 ( checker Docker )
  @Get('service-unexpected-error/:id')
  serviceUnexpectedError(@Param('id') id: number) {
    return this.appService.unexpectedError(id)
  }

  // 빌드 환경에서의 도커 로그 AppService.unexpectedError와 message는 중요하고 충분한 힌트
  // 2025-05-29 17:10:48 [Nest] 1  - 05/29/2025, 8:10:48 AM   ERROR [ExceptionsHandler] TypeError: id.toFixed is not a function
  // 2025-05-29 17:10:48     at AppService.unexpectedError (/usr/src/app/dist/app.service.js:16:19)
  // 2025-05-29 17:10:48     at AppController.serviceUnexpectedError (/usr/src/app/dist/app.controller.js:51:32)
  // 2025-05-29 17:10:48     at /usr/src/app/node_modules/@nestjs/core/router/router-execution-context.js:38:29
  // 2025-05-29 17:10:48     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
  // 2025-05-29 17:10:48     at async /usr/src/app/node_modules/@nestjs/core/router/router-execution-context.js:46:28
  // 2025-05-29 17:10:48     at async /usr/src/app/node_modules/@nestjs/core/router/router-proxy.js:9:17
}
