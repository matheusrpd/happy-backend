import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addFieldsToUser1615657218220 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'birthday',
        type: 'timestamp',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'country',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'state',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'city',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'neighborhood',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'street',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'street_number',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'zipcode',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'phone_number');
    await queryRunner.dropColumn('users', 'cpf');
    await queryRunner.dropColumn('users', 'birthday');
    await queryRunner.dropColumn('users', 'country');
    await queryRunner.dropColumn('users', 'state');
    await queryRunner.dropColumn('users', 'city');
    await queryRunner.dropColumn('users', 'neighborhood');
    await queryRunner.dropColumn('users', 'street');
    await queryRunner.dropColumn('users', 'street_number');
    await queryRunner.dropColumn('users', 'zipcode');
  }
}