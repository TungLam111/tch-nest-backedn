import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUsersTable1707928292562 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
