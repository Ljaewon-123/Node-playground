import { MigrationInterface, QueryRunner } from "typeorm";

export class Timescale1739237072389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `
            
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


            `
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
