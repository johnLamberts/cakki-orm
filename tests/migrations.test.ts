import { CreateUsersTable } from "../examples/migrations/create_users_table";
import { Connection } from "../src/core/connection";
import { SchemaBuilder } from "../src/core/schema-builder";
import { cleanDatabase, setupTestDatabase, teardownTestDatabase } from "./setup";

describe('Migration and Schema', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  test('should generate CREATE TABLE SQL', () => {
    const builder = new SchemaBuilder('test_table');
    builder.id();
    builder.string('name').notNullable();
    builder.integer('age').nullable();
    builder.timestamps();

    const sql = builder.toCreateSQL();

    expect(sql).toContain('CREATE TABLE IF NOT EXISTS test_table');
    expect(sql).toContain('id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY');
    expect(sql).toContain('name VARCHAR(255) NOT NULL');
    expect(sql).toContain('age INT NULL');
    expect(sql).toContain('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
  });

  test('should run migration up', async () => {
    const migration = new CreateUsersTable();
    await cleanDatabase();
    await migration.up();

    const conn = Connection.getInstance();
    const result = await conn.query(`SHOW TABLES LIKE 'users'`);
    expect(result).toHaveLength(1);
  });

  test('should run migration down', async () => {
    const migration = new CreateUsersTable();
    await migration.down();

    const conn = Connection.getInstance();
    const result = await conn.query(`SHOW TABLES LIKE 'users'`);
    expect(result).toHaveLength(0);
  });
});
