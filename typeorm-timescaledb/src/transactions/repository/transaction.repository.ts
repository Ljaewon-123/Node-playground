import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Transactions } from 'src/entity/transaction.entity';
import { DataSource, Repository, Transaction } from 'typeorm';
import { TimescaleRepository } from '@timescaledb/typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: TimescaleRepository<Transactions>,

    @InjectDataSource()
    private datasource: DataSource
  ){};

  // 가장 최근의 코인베이스 거래 5개 찾기
  async find5LatestCoinbaseTransaction() {
    return await this.transactionRepository.find({
      select: ['time', 'hash', 'block_id', 'fee_usd'],
      where: { is_coinbase: true },
      order: { time: 'DESC' },
      take: 5,
    });
  }

  // 가장 최근의 거래 5건은 무엇입니까?
  async find5LatestTransaction() {
    return await this.transactionRepository.find({
      select: ['time', 'hash', 'block_id', 'fee_usd'],
      where: { is_coinbase: true },
      order: { time: 'DESC' },
      take: 5
    })
  }

  // 가장 최근의 블록 5개는 무엇입니까?
  async findLatest5Blocks() {
    const result = await this.transactionRepository
      .createQueryBuilder('t')
      .select('t.block_id', 'block_id')
      .addSelect('COUNT(*)', 'transaction_count')
      .addSelect('SUM(t.weight)', 'block_weight')
      .addSelect('SUM(t.output_total_usd)', 'block_value_usd')
      .where('t.is_coinbase IS NOT TRUE')
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('block_id')
          .from(Transaction, 'sub_t')
          .where('sub_t.is_coinbase = TRUE')
          .orderBy('sub_t.time', 'DESC')
          .limit(5)
          .getQuery();
        return `t.block_id IN ${subQuery}`;
      })
      .groupBy('t.block_id')
      .getRawMany();

    return result;
  }



  howToUseTimeBucket() {
    // Method 1
    // this.transactionRepository.getTimeBucket();

    // // Method 2
    // const transaction = this.datasource.getRepository(Transactions)
    // transaction.getTimeBucket();
  }
}
