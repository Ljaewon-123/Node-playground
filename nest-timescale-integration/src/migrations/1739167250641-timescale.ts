import { MigrationInterface, QueryRunner } from "typeorm";

export class Timescale1739167250641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("SELECT create_hypertable('user', by_range('created_at'));")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
