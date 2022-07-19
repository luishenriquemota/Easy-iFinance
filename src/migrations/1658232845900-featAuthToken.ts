import { MigrationInterface, QueryRunner } from "typeorm";

export class featAuthToken1658232845900 implements MigrationInterface {
    name = 'featAuthToken1658232845900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friendlist" ("id" SERIAL NOT NULL, "user1Id" uuid, "user2Id" uuid, CONSTRAINT "PK_3a181751d9d2c7a9393c053447e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "authToken" character varying`);
        await queryRunner.query(`ALTER TABLE "friendlist" ADD CONSTRAINT "FK_b2a36f3b77f7a849561985cf572" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendlist" ADD CONSTRAINT "FK_8efcd3c0f51cf71dc9e3e0abe50" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friendlist" DROP CONSTRAINT "FK_8efcd3c0f51cf71dc9e3e0abe50"`);
        await queryRunner.query(`ALTER TABLE "friendlist" DROP CONSTRAINT "FK_b2a36f3b77f7a849561985cf572"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "authToken"`);
        await queryRunner.query(`DROP TABLE "friendlist"`);
    }

}
