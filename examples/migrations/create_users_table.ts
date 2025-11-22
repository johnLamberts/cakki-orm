import { Migration } from "../../src/core/migration";

export class CreateUsersTable extends Migration {
  async up(): Promise<void> {
    await this.createTable('users', (table) => {
      console.log(table);
      table.id();
      table.string('email').unique().notNullable();
      table.string('name').notNullable();
      table.string('password').notNullable();
      table.timestamps();
    });
  }

  async down(): Promise<void> {
    await this.dropTable('users');
  }
}
