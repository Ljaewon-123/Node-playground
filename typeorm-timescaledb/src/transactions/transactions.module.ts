import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repository/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/entity/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository]
})
export class TransactionsModule {}
