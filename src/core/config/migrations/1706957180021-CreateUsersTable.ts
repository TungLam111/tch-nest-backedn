import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1706957180021 implements MigrationInterface {
    name = 'CreateUsersTable1706957180021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_method" ("isDeleted" boolean NOT NULL DEFAULT false, "deletedDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "paymentMethodType" character varying NOT NULL, CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("isDeleted" boolean NOT NULL DEFAULT false, "deletedDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderCode" character varying NOT NULL, "userId" character varying NOT NULL, "orderType" character varying NOT NULL, "totalAmount" integer NOT NULL, "quantity" integer NOT NULL, "couponId" character varying, "status" character varying NOT NULL, "paymentMethodId" character varying NOT NULL, "discountAmount" integer, "note" character varying, "orderRatingId" character varying, "timeDelivery" TIMESTAMP, "timeComplete" TIMESTAMP, "isCancel" boolean NOT NULL DEFAULT false, "cancelReason" character varying, "shipFee" integer, "shipAddress" character varying, "shipCoordinates" character varying, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_product" ("isDeleted" boolean NOT NULL DEFAULT false, "deletedDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "topping" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping" ADD "maxSelect" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topping" ADD "minSelect" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "FK_76a47edf2c30c8ea99427bac99b"`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "FK_150d6707f667bd31273b29a86b9"`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "REL_76a47edf2c30c8ea99427bac99"`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "REL_150d6707f667bd31273b29a86b"`);
        await queryRunner.query(`ALTER TABLE "menu_product" DROP CONSTRAINT "FK_7617f4b43219a457b910cb61eb4"`);
        await queryRunner.query(`ALTER TABLE "menu_product" DROP CONSTRAINT "FK_2c037032958a2cc2387ad79487c"`);
        await queryRunner.query(`ALTER TABLE "menu_product" DROP CONSTRAINT "REL_7617f4b43219a457b910cb61eb"`);
        await queryRunner.query(`ALTER TABLE "menu_product" DROP CONSTRAINT "REL_2c037032958a2cc2387ad79487"`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "FK_76a47edf2c30c8ea99427bac99b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "FK_150d6707f667bd31273b29a86b9" FOREIGN KEY ("toppingId") REFERENCES "topping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_product" ADD CONSTRAINT "FK_2c037032958a2cc2387ad79487c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_product" ADD CONSTRAINT "FK_7617f4b43219a457b910cb61eb4" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_product" DROP CONSTRAINT "FK_7617f4b43219a457b910cb61eb4"`);
        await queryRunner.query(`ALTER TABLE "menu_product" DROP CONSTRAINT "FK_2c037032958a2cc2387ad79487c"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "FK_150d6707f667bd31273b29a86b9"`);
        await queryRunner.query(`ALTER TABLE "product_topping" DROP CONSTRAINT "FK_76a47edf2c30c8ea99427bac99b"`);
        await queryRunner.query(`ALTER TABLE "menu_product" ADD CONSTRAINT "REL_2c037032958a2cc2387ad79487" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "menu_product" ADD CONSTRAINT "REL_7617f4b43219a457b910cb61eb" UNIQUE ("menuId")`);
        await queryRunner.query(`ALTER TABLE "menu_product" ADD CONSTRAINT "FK_2c037032958a2cc2387ad79487c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_product" ADD CONSTRAINT "FK_7617f4b43219a457b910cb61eb4" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "REL_150d6707f667bd31273b29a86b" UNIQUE ("toppingId")`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "REL_76a47edf2c30c8ea99427bac99" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "FK_150d6707f667bd31273b29a86b9" FOREIGN KEY ("toppingId") REFERENCES "topping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_topping" ADD CONSTRAINT "FK_76a47edf2c30c8ea99427bac99b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topping" DROP COLUMN "minSelect"`);
        await queryRunner.query(`ALTER TABLE "topping" DROP COLUMN "maxSelect"`);
        await queryRunner.query(`ALTER TABLE "topping" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "payment_method"`);
    }

}
