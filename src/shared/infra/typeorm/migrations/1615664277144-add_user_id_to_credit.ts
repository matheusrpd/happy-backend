import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class addUserIdToCredit1615664277144 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'credit_card',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'credit_card',
      new TableForeignKey({
        name: 'UserCreditCard',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('credit_card', 'UserCreditCard');
    await queryRunner.dropColumn('credit_card', 'userId');
  }

}
