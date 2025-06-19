import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('coinbase-latest')
  getCoinbaseLatest() {
    return this.transactionsService.getLatestCoinbaseTransactions();
  }

  @Get('latest')
  getLatestTransactions() {
    return this.transactionsService.getLatestTransactions();
  }

  @Get('blocks-aggregate')
  getLatest5Blocks() {
    return this.transactionsService.getLatest5BlocksAggregated();
  }
}
