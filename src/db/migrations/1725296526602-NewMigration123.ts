import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1231725296526602 implements MigrationInterface {
    name = 'NewMigration1231725296526602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "filename" character varying NOT NULL, "size" integer, "mimeType" character varying, "description" character varying, "animalId" uuid, CONSTRAINT "PK_d8375e0b2592310864d2b4974b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_54095a0a68333bb07a7402bba5b"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "customer_code"`);
        await queryRunner.query(`ALTER TABLE "animals_entity" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file_entity" ADD CONSTRAINT "FK_35e18ffbb1d91cefb6c71cd39b6" FOREIGN KEY ("animalId") REFERENCES "animals_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_35e18ffbb1d91cefb6c71cd39b6"`);
        await queryRunner.query(`ALTER TABLE "animals_entity" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "customer_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_54095a0a68333bb07a7402bba5b" UNIQUE ("customer_code")`);
        await queryRunner.query(`DROP TABLE "file_entity"`);
    }

}
