import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCarsSpecifications1618347321984
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_specifications',
        columns: [
          {
            name: 'car_id',
            type: 'uuid'
          },
          {
            name: 'specification_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKCarSpecificationCar',
            columnNames: ['car_id'],
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKSpecificationCarSpecification',
            columnNames: ['specification_id'],
            referencedTableName: 'specifications',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_specifications')
  }
}
