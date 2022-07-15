"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createtables1657825093482 = void 0;
class createtables1657825093482 {
    constructor() {
        this.name = 'createtables1657825093482';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "transactions" ("transactions_id" SERIAL NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "category" character varying NOT NULL, "cardId" integer, "userId" uuid, CONSTRAINT "PK_95ab9d95eab5f379fa6d54bf7af" PRIMARY KEY ("transactions_id"))`);
            yield queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "limit" numeric(10,2) NOT NULL, "type" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "closingDate" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "card_allowed_users_user" ("cardId" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_49c01892ca11e9e8fb1b7e70124" PRIMARY KEY ("cardId", "userId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_3ef1b778e8e880eba77a6c836f" ON "card_allowed_users_user" ("cardId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_a1f0c9f16fec6f827cc0d3b3a2" ON "card_allowed_users_user" ("userId") `);
            yield queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d1dac70b33bf7a903782df5b637" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "card_allowed_users_user" ADD CONSTRAINT "FK_3ef1b778e8e880eba77a6c836f0" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "card_allowed_users_user" ADD CONSTRAINT "FK_a1f0c9f16fec6f827cc0d3b3a29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "card_allowed_users_user" DROP CONSTRAINT "FK_a1f0c9f16fec6f827cc0d3b3a29"`);
            yield queryRunner.query(`ALTER TABLE "card_allowed_users_user" DROP CONSTRAINT "FK_3ef1b778e8e880eba77a6c836f0"`);
            yield queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_c9dc71a83fa3e676bcdbe362c17"`);
            yield queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
            yield queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d1dac70b33bf7a903782df5b637"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_a1f0c9f16fec6f827cc0d3b3a2"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_3ef1b778e8e880eba77a6c836f"`);
            yield queryRunner.query(`DROP TABLE "card_allowed_users_user"`);
            yield queryRunner.query(`DROP TABLE "card"`);
            yield queryRunner.query(`DROP TABLE "transactions"`);
            yield queryRunner.query(`DROP TABLE "user"`);
        });
    }
}
exports.createtables1657825093482 = createtables1657825093482;
