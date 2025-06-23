// src/logger/winston-logger.config.ts
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: winston.LoggerOptions = {
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.json()
  ),
  transports: [
    // 1. error 전용 파일
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,              // 최대 5개 파일 유지 (error.log, error1.log 등)
    }),

    // 2. 전체 로그 (info 이상)
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
      maxsize: 5 * 1024 * 1024, // 10MB
      maxFiles: 3,               // 최대 3개 파일 유지
    }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Nest', { prettyPrint: true })
      ),
    }),
  ],
};
