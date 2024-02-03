import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1706951854407 implements MigrationInterface {
    name = 'CreateUsersTable1706951854407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topping_option" ("isDeleted" boolean NOT NULL DEFAULT false, "deletedDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "toppingId" uuid NOT NULL, CONSTRAINT "PK_4af806078ad1d22d8c55ef89a15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_topping" ("isDeleted" boolean NOT NULL DEFAULT false, "deletedDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "toppingId" uuid NOT NULL, CONSTRAINT "REL_76a47edf2c30c8ea99427bac99" UNIQUE ("productId"), CONSTRAINT "REL_150d6707f667bd31273b29a86b" UNIQUE ("toppingId"), CONSTRAINT "PK_3bb65ab85a467c6ea5f18922a6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "topping" ADD "isRequired" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "topping_option" ADD CONSTRAINT "FK_53e645fef65a409c6461408bc10" FOREIGN KEY ("toppingId") REFERENCES "topping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "FK_76a47edf2c30c8ea99427bac99b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "FK_150d6707f667bd31273b29a86b9" FOREIGN KEY ("toppingId") REFERENCES "topping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "FK_150d6707f667bd31273b29a86b9"`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "FK_76a47edf2c30c8ea99427bac99b"`);
        await queryRunner.query(`ALTER TABLE "topping_option" DROP CONSTRAINT "FK_53e645fef65a409c6461408bc10"`);
        await queryRunner.query(`ALTER TABLE "topping" DROP COLUMN "isRequired"`);
        await queryRunner.query(`DROP TABLE "product_topping"`);
        await queryRunner.query(`DROP TABLE "topping_option"`);
    }

}
