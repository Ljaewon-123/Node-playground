import * as winston from 'winston';
import { CloudWatchTransport } from './cloudwatch-transport';

function createWinstonOptions(): winston.LoggerOptions {
  const isProd = process.env.NODE_ENV === 'production';

  const transports: winston.transport[] = [
    // file -> error 전용 파일
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,              // 최대 5개 파일 유지 (error.log, error1.log 등)
    }),

    // file -> 전체 로그 (info 이상)
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
      maxsize: 5 * 1024 * 1024, // 10MB
      maxFiles: 3,               // 최대 3개 파일 유지
    }),

    // winston 콘솔로그
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          return `[${timestamp}] ${level}: ${message} ${metaString}`
        })
      )
    }),
  ]

  if (isProd) {
    transports.push(
      new CloudWatchTransport({
        region: process.env.AWS_REGION || 'us-west-2',
        logGroupName: process.env.CLOUDWATCH_LOG_GROUP || 'nuxt-winston-log-group',
        logStreamName: process.env.CLOUDWATCH_LOG_STREAM || 'nuxt-winston-log-stream',
        level: 'http',
        awsConfig: {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
        },
      }),
    );
  }

  return {
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json(),
    ),
    transports,
  };
};

export const winstonLogger = winston.createLogger(createWinstonOptions())
