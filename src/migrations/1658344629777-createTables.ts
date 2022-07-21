import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1658344629777 implements MigrationInterface {
    name = 'createTables1658344629777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friendlist" ("id" SERIAL NOT NULL, "userId" uuid, "friendId" uuid, CONSTRAINT "PK_3a181751d9d2c7a9393c053447e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, "authToken" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("transactions_id" SERIAL NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "category" character varying NOT NULL, "cardId" integer, "userId" uuid, CONSTRAINT "PK_95ab9d95eab5f379fa6d54bf7af" PRIMARY KEY ("transactions_id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "limit" numeric(10,2) NOT NULL, "type" character varying NOT NULL, "dueDate" integer NOT NULL, "closingDate" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_allowed_users_user" ("cardId" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_49c01892ca11e9e8fb1b7e70124" PRIMARY KEY ("cardId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ef1b778e8e880eba77a6c836f" ON "card_allowed_users_user" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1f0c9f16fec6f827cc0d3b3a2" ON "card_allowed_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "friendlist" ADD CONSTRAINT "FK_04921d9820449cab2b5c4570d95" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendlist" ADD CONSTRAINT "FK_1ed62ddfd3d561b37ba4cd96946" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d1dac70b33bf7a903782df5b637" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" ADD CONSTRAINT "FK_3ef1b778e8e880eba77a6c836f0" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" ADD CONSTRAINT "FK_a1f0c9f16fec6f827cc0d3b3a29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" DROP CONSTRAINT "FK_a1f0c9f16fec6f827cc0d3b3a29"`);
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" DROP CONSTRAINT "FK_3ef1b778e8e880eba77a6c836f0"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d1dac70b33bf7a903782df5b637"`);
        await queryRunner.query(`ALTER TABLE "friendlist" DROP CONSTRAINT "FK_1ed62ddfd3d561b37ba4cd96946"`);
        await queryRunner.query(`ALTER TABLE "friendlist" DROP CONSTRAINT "FK_04921d9820449cab2b5c4570d95"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1f0c9f16fec6f827cc0d3b3a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ef1b778e8e880eba77a6c836f"`);
        await queryRunner.query(`DROP TABLE "card_allowed_users_user"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "friendlist"`);
    }

}
