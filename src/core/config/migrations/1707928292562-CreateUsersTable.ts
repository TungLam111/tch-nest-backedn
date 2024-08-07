import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1707928292562 implements MigrationInterface {
    name = 'CreateUsersTable1707928292562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dob" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dob" SET NOT NULL`);
    }

}
