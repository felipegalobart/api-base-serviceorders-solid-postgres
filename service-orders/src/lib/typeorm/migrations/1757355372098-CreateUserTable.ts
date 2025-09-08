import type { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1757355372098 implements MigrationInterface {
  name = 'CreateUserTable[timestamp]'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_user_username" UNIQUE ("username"),
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
