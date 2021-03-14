import { 
  MigrationInterface, 
  QueryRunner, 
  Table,
  TableForeignKey
} from "typeorm";

export class createTransaction1615750119232 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'donations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'decimal',
            scale: 2,
            precision: 12,
          },
          {
            name: 'orphanage_id',
            type: 'integer',
          },
          {
            name: 'user_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      "donations",
      new TableForeignKey({
        columnNames: ["orphanage_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "orphanages",
        name: "fk_donations_orphanage",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "donations",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        name: "fk_donations_users",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("donations", "fk_donations_users");
    await queryRunner.dropForeignKey("donations", "fk_donations_orphanage");
    await queryRunner.dropTable("donations"); 
  }
}
