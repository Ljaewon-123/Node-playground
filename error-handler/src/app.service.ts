import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  buildInError() {
    throw new BadRequestException('Bad Request Error')
  }

  unexpectedError(id: number) {
    return id.toFixed(2)
  }
}
