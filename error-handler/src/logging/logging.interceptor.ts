import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { catchError, Observable, tap, throwError, TimeoutError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(
        catchError(err => {
          console.log(err instanceof Error, err, 'interceptor')
          return throwError(() => err);
        }),
      )
  }
}

// 스읍... 되어있네???? ㅎㅎ;;;
// 일반적으로 필요없다는거네 
// 모든걸 잡아서 만약 에러로 별개의 뭔가가 필요하다면 에러 연동 등등 이때 필요할거같음 