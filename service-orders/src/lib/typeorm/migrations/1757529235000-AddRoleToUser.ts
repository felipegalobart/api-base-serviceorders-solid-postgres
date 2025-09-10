import type { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleToUser1757529235000 implements MigrationInterface {
  name = 'AddRoleToUser1757529235000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar enum type para roles
    await queryRunner.query(`
      CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user', 'manager', 'viewer')
    `)

    // Adicionar coluna role com valor padrão 'user'
    await queryRunner.query(`
      ALTER TABLE "user" 
      ADD COLUMN "role" "public"."user_role_enum" DEFAULT 'user'
    `)

    // Atualizar registros existentes para terem role 'user' (opcional, já que tem default)
    await queryRunner.query(`
      UPDATE "user" 
      SET "role" = 'user' 
      WHERE "role" IS NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover coluna role
    await queryRunner.query(`
      ALTER TABLE "user" 
      DROP COLUMN "role"
    `)

    // Remover enum type
    await queryRunner.query(`
      DROP TYPE "public"."user_role_enum"
    `)
  }
}
