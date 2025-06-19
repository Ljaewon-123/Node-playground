import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoAssets } from './entity/crypto-assets.entity';
import { CryptoTick } from './entity/crypto-ticks.entity';
import { Transactions } from './entity/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { IotModule } from './iot/iot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'crypto',
      entities: [Transactions, CryptoTick, CryptoAssets],
      migrations: ['migrations/*.ts'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TransactionsModule,
    IotModule,
  ],
})
export class AppModule {}
