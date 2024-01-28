import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1706472227542 implements MigrationInterface {
    name = 'CreateUsersTable1706472227542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
