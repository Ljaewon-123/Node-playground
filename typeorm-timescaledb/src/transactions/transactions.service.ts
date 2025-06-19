import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionsService {
    constructor(
      private readonly transactionsRepository: TransactionsRepository,
    ) {}

    async getLatestCoinbaseTransactions() {
      return this.transactionsRepository.find5LatestCoinbaseTransaction();
    }

    async getLatest5BlocksAggregated() {
      return this.transactionsRepository.findLatest5Blocks();
    }

    async getLatestTransactions() {
      return this.transactionsRepository.find5LatestTransaction();
    }
}
