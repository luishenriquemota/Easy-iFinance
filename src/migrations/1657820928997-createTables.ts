import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657820928997 implements MigrationInterface {
    name = 'createTables1657820928997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "friendList_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ownCardList_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "allowedCardList_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "allowedCardList_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "ownCardList_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "friendList_id" integer NOT NULL`);
    }

}
