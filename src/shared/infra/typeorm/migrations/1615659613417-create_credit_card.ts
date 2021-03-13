import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCreditCard1615659613417 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'credit_card',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'cvv',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'expiration_date',
            type: 'varchar',
          },
          {
            name: 'holder_name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('credit_card');
  }

}
