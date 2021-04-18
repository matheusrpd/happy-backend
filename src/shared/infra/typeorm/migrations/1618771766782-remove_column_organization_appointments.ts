import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class removeColumnOrganizationAppointments1618771766782 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'organization');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'organization',
        type: 'varchar',
      }),
    );
  }
}
