import { MigrationInterface, QueryRunner } from "typeorm";

export class Timescale1739171639828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("SELECT create_hypertable('bitcoin', by_range('time'));")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
