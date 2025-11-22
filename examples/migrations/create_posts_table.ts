import { Migration } from "../../src/core/migration";

export class CreatePostsTable extends Migration {
  async up(): Promise<void> {
    await this.createTable('posts', (table) => {
      table.id();
      table.bigInteger('user_id').unsigned().notNullable();      table.string('title').notNullable();
      table.text('content').notNullable();
      table.boolean('published').default(false).notNullable();
      table.timestamps();
      table.foreign('user_id', 'id', 'users');
    });
  }

  async down(): Promise<void> {
    await this.dropTable('posts');
  }
}
