import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1707752950479 implements MigrationInterface {
    name = 'CreateUsersTable1707752950479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "basePrice" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "basePrice"`);
    }

}
