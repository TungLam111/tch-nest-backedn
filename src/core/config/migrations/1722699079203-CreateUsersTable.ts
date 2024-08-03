import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1722699079203 implements MigrationInterface {
    name = 'CreateUsersTable1722699079203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_card" DROP COLUMN "issueNumber"`);
        await queryRunner.query(`ALTER TABLE "payment_card" DROP COLUMN "billingAddressID"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "couponId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "discountAmount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "note" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderRatingId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "timeDelivery" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "timeComplete" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "isCancel" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "cancelReason" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shipFee" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shipAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shipCoordinates" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shipCoordinates" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shipAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shipFee" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "cancelReason" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "isCancel" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "timeComplete" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "timeDelivery" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "orderRatingId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "note" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "discountAmount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "couponId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_card" ADD "billingAddressID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_card" ADD "issueNumber" character varying NOT NULL`);
    }

}
