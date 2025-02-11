import { MigrationInterface, QueryRunner } from "typeorm";

export class Timescale1739172200944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `
            SELECT add_continuous_aggregate_policy('one_hour_transactions1',
   start_offset => INTERVAL '3 hours',
   end_offset => INTERVAL '1 hour',
   schedule_interval => INTERVAL '1 hour');`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}


/**
 * 
 * 
 * 
CREATE MATERIALIZED VIEW one_hour_transactions1
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', time) AS bucket,
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
GROUP BY bucket;

이건 정책
SELECT add_continuous_aggregate_policy('one_hour_transactions1',
   start_offset => INTERVAL '3 hours',
   end_offset => INTERVAL '1 hour',
   schedule_interval => INTERVAL '1 hour');


CREATE MATERIALIZED VIEW one_hour_blocks
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', time) AS bucket,
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
GROUP BY bucket, block_id;

// 정책
SELECT add_continuous_aggregate_policy('one_hour_blocks',
   start_offset => INTERVAL '3 hours',
   end_offset => INTERVAL '1 hour',
   schedule_interval => INTERVAL '1 hour');

   CREATE MATERIALIZED VIEW one_hour_coinbase
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', time) AS bucket,
   count(*) AS tx_count,
   stats_agg(output_total, output_total_usd) AS stats_miner_revenue,
   min(output_total) AS min_miner_revenue,
   max(output_total) AS max_miner_revenue
FROM bitcoin
WHERE is_coinbase IS TRUE
GROUP BY bucket;


SELECT add_continuous_aggregate_policy('one_hour_coinbase',
   start_offset => INTERVAL '3 hours',
   end_offset => INTERVAL '1 hour',
   schedule_interval => INTERVAL '1 hour');

 * 
 */