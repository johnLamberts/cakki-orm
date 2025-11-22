import { Connection } from "../src/core/connection";
import { cleanDatabase, setupTestDatabase, teardownTestDatabase } from "./setup";

describe('Connection', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  })

  afterAll(async() => {
    await teardownTestDatabase();
  })

  test('should connect to database', async () => {
    const conn = Connection.getInstance();
    expect(conn).toBeDefined();
    
    const result = await conn.query('SELECT 1 as value');
    expect(result).toEqual([{ value: 1 }]);
  });

  test('should execute queries with parameters', async () => {
    const conn = Connection.getInstance();
    await cleanDatabase();
    
    await conn.query(`
      CREATE TABLE IF NOT EXISTS test_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
      )
    `);

    await conn.query('INSERT INTO test_users (name) VALUES (?)', ['Alice']);
    const result = await conn.query<any[]>('SELECT * FROM test_users WHERE name = ?', ['Alice']);
    
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Alice');

    await conn.query('DROP TABLE test_users');
  });

  test('should handle connection pool', async () => {
    const conn = Connection.getInstance();
    const pool = conn.getPool();
    
    expect(pool).toBeDefined();
    
    const connection = await conn.getConnection();
    expect(connection).toBeDefined();
    connection.release();
  });

})


