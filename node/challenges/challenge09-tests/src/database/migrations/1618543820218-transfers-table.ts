import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class transfersTable1618543820218 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'transfers',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true
            },
            {
              name: 'sender_id',
              type: 'uuid'
            },
            {
              name: 'recipient_id',
              type: 'uuid'
            },
            {
              name: 'amount',
              type: 'numeric',
              precision: 5,
              scale: 2
            },
            {
              name: 'description',
              type: 'varchar'
            },
            {
              name: 'type',
              type: 'varchar'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
          ],
          foreignKeys: [
            {
              name: 'FKTransferSender',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['sender_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            },
            {
              name: 'FKTransferRecipient',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['recipient_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
            }
          ]
        }
      )
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transfers')
  }
}
