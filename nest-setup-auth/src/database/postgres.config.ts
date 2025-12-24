import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConnectionService implements TypeOrmOptionsFactory {
  isProd: boolean
  constructor(private configService: ConfigService) {
    this.isProd = this.configService.get('NODE_ENV') === 'production';
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>("DB_HOST"),
      port: this.configService.get<number>("DB_PORT"),
      username: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
      database: this.configService.get<string>("DB_NAME"),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false, //this.isProd ? false : true, // # timescaledb와 호환이 잘 안된다.. 
      autoLoadEntities: true,
      // logging: true,
    }
  }
}