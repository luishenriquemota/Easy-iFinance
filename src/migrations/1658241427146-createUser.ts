import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1658241427146 implements MigrationInterface {
    name = 'createUser1658241427146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friends" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d3431ad56a24bd6081af511d8e1" UNIQUE ("email"), CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, "authToken" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("transactions_id" SERIAL NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "category" character varying NOT NULL, "cardId" integer, "userId" uuid, CONSTRAINT "PK_95ab9d95eab5f379fa6d54bf7af" PRIMARY KEY ("transactions_id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "limit" numeric(10,2) NOT NULL, "type" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "closingDate" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friendlist" ("id" SERIAL NOT NULL, "user1Id" uuid, "user2Id" uuid, CONSTRAINT "PK_3a181751d9d2c7a9393c053447e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_friend_list_friends" ("userId" uuid NOT NULL, "friendsId" integer NOT NULL, CONSTRAINT "PK_3888e768a831324802f126d0e92" PRIMARY KEY ("userId", "friendsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9721087e4f8330137dd1271b7a" ON "user_friend_list_friends" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d307a9b841b1a187f147e670ae" ON "user_friend_list_friends" ("friendsId") `);
        await queryRunner.query(`CREATE TABLE "card_allowed_users_user" ("cardId" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_49c01892ca11e9e8fb1b7e70124" PRIMARY KEY ("cardId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ef1b778e8e880eba77a6c836f" ON "card_allowed_users_user" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1f0c9f16fec6f827cc0d3b3a2" ON "card_allowed_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d1dac70b33bf7a903782df5b637" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendlist" ADD CONSTRAINT "FK_b2a36f3b77f7a849561985cf572" FOREIGN KEY ("user1Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendlist" ADD CONSTRAINT "FK_8efcd3c0f51cf71dc9e3e0abe50" FOREIGN KEY ("user2Id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friend_list_friends" ADD CONSTRAINT "FK_9721087e4f8330137dd1271b7a0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friend_list_friends" ADD CONSTRAINT "FK_d307a9b841b1a187f147e670ae4" FOREIGN KEY ("friendsId") REFERENCES "friends"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" ADD CONSTRAINT "FK_3ef1b778e8e880eba77a6c836f0" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" ADD CONSTRAINT "FK_a1f0c9f16fec6f827cc0d3b3a29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" DROP CONSTRAINT "FK_a1f0c9f16fec6f827cc0d3b3a29"`);
        await queryRunner.query(`ALTER TABLE "card_allowed_users_user" DROP CONSTRAINT "FK_3ef1b778e8e880eba77a6c836f0"`);
        await queryRunner.query(`ALTER TABLE "user_friend_list_friends" DROP CONSTRAINT "FK_d307a9b841b1a187f147e670ae4"`);
        await queryRunner.query(`ALTER TABLE "user_friend_list_friends" DROP CONSTRAINT "FK_9721087e4f8330137dd1271b7a0"`);
        await queryRunner.query(`ALTER TABLE "friendlist" DROP CONSTRAINT "FK_8efcd3c0f51cf71dc9e3e0abe50"`);
        await queryRunner.query(`ALTER TABLE "friendlist" DROP CONSTRAINT "FK_b2a36f3b77f7a849561985cf572"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d1dac70b33bf7a903782df5b637"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1f0c9f16fec6f827cc0d3b3a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ef1b778e8e880eba77a6c836f"`);
        await queryRunner.query(`DROP TABLE "card_allowed_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d307a9b841b1a187f147e670ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9721087e4f8330137dd1271b7a"`);
        await queryRunner.query(`DROP TABLE "user_friend_list_friends"`);
        await queryRunner.query(`DROP TABLE "friendlist"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "friends"`);
    }

}
