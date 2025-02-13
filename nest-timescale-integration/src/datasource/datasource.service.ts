import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// 하이퍼테이블 만드는것도 추가해야할지??
/** 
  SELECT * 
  FROM timescaledb_information.hypertables 
  WHERE hypertable_name = 'user';
*/


@Injectable()
export class DatasourceService {

  constructor(private dataSource: DataSource){}

  async coinbaseView() {
    const query = `
      DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'one_hour_coinbase1' AND relkind = 'v') THEN
          EXECUTE '
              CREATE MATERIALIZED VIEW one_hour_coinbase1
              WITH (timescaledb.continuous) AS
              SELECT time_bucket(''1 hour'', time) AS bucket,
                      count(*) AS tx_count,
                      stats_agg(output_total, output_total_usd) AS stats_miner_revenue,
                      min(output_total) AS min_miner_revenue,
                      max(output_total) AS max_miner_revenue
              FROM bitcoin
              WHERE is_coinbase IS TRUE
              GROUP BY bucket';
          END IF;
          
      END $$;
    `;
  
    try {
      await this.dataSource.query(query);
  
      const policy = await this.dataSource.query(`
        SELECT * 
        FROM timescaledb_information.continuous_aggregates
        WHERE view_name = 'one_hour_coinbase1';
      `)
      // console.log(policy.rows[0].view_name == 'one_hour_coinbase1')
      
      if(!policy){
        await this.dataSource.query(`
          PERFORM add_continuous_aggregate_policy(
              'one_hour_coinbase1',
              start_offset => INTERVAL '3 hours',
              end_offset => INTERVAL '1 hour',
              schedule_interval => INTERVAL '1 hour'
          );
        `)
      }
  
      
      console.log("Materialized view created and refresh coinbase view and policy applied.");
    } catch (err) {
      console.error('Error executing query:', err);
    }
  }

  
  async blockView() {
    const query = `
      DO $$ 
      BEGIN
          -- Check if the materialized view 'one_hour_blocks1' already exists
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'one_hour_blocks1' AND relkind = 'v') THEN
              EXECUTE '
                  CREATE MATERIALIZED VIEW one_hour_blocks1
                  WITH (timescaledb.continuous) AS
                  SELECT time_bucket(''1 hour'', time) AS bucket,
                        block_id,
                        count(*) AS tx_count,
                        sum(fee) AS block_fee_sat,
                        sum(fee_usd) AS block_fee_usd,
                        stats_agg(fee) AS stats_tx_fee_sat,
                        avg(size) AS avg_tx_size,
                        avg(weight) AS avg_tx_weight,
                        sum(size) AS block_size,
                        sum(weight) AS block_weight,
                        max(size) AS max_tx_size,
                        max(weight) AS max_tx_weight,
                        min(size) AS min_tx_size,
                        min(weight) AS min_tx_weight
                  FROM bitcoin
                  WHERE is_coinbase IS NOT TRUE
                  GROUP BY bucket, block_id';
          END IF;
  
      END $$;
  
    `;
  
    try {
      await this.dataSource.query(query);
  
      const policy = await this.dataSource.query(`
        SELECT * 
        FROM timescaledb_information.continuous_aggregates
        WHERE view_name = 'one_hour_blocks1';
      `)
      
      if(!policy){
        await this.dataSource.query(`
          PERFORM add_continuous_aggregate_policy(
              'one_hour_blocks1',
              start_offset => INTERVAL '3 hours',
              end_offset => INTERVAL '1 hour',
              schedule_interval => INTERVAL '1 hour'
          );
        `)
      }
  
  
      console.log("Materialized view 'one_hour_blocks1' created and policy applied.");
    } catch (err) {
      console.error('Error executing query:', err);
    }
  }
  
  
  async transaction1View() {
    const query = `
      DO $$ 
      BEGIN
          -- Check if the materialized view 'one_hour_transactions1' already exists
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'one_hour_transactions1' AND relkind = 'v') THEN
              EXECUTE '
                  CREATE MATERIALIZED VIEW one_hour_transactions1
                  WITH (timescaledb.continuous) AS
                  SELECT time_bucket(''1 hour'', time) AS bucket,
                         count(*) AS tx_count,
                         sum(fee) AS total_fee_sat,
                         sum(fee_usd) AS total_fee_usd,
                         stats_agg(fee) AS stats_fee_sat,
                         avg(size) AS avg_tx_size,
                         avg(weight) AS avg_tx_weight,
                         count(
                               CASE
                                  WHEN (fee > output_total) THEN hash
                                  ELSE NULL
                               END) AS high_fee_count
                  FROM bitcoin
                  WHERE (is_coinbase IS NOT TRUE)
                  GROUP BY bucket';
          END IF;
  
      END $$;
    `;
  
    try {
      await this.dataSource.query(query);
  
      const policy = await this.dataSource.query(`
        SELECT * 
        FROM timescaledb_information.continuous_aggregates
        WHERE view_name = 'one_hour_transactions1';
      `)
      
      if(!policy){
        await this.dataSource.query(`
          PERFORM add_continuous_aggregate_policy(
              'one_hour_transactions1',
              start_offset => INTERVAL '3 hours',
              end_offset => INTERVAL '1 hour',
              schedule_interval => INTERVAL '1 hour'
          );
        `)
      }
  
      console.log("Materialized view 'one_hour_transactions1' created and policy applied.");
    } catch (err) {
      console.error('Error executing query:', err);
    }
  }
  
  
}
