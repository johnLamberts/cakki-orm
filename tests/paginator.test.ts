import { Connection } from "../src/core/connection";
import { Paginator } from "../src/modules/paginator";
import { TestUser } from "./repository.test";

describe('Paginator', () => {
  beforeAll(async () => {
    // ... (Connection setup) ...
    const conn = Connection.getInstance();
    
    // 1. Create table for PAGINATOR tests (as currently written)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS test_pagination (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    // 2. Create table for REPOSITORY tests (Targeted by TestUser model)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS test_users_repo (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
        created_at DATETIME,
        updated_at DATETIME
      )
    `);
  });

  afterAll(async () => {
    const conn = Connection.getInstance();
    await conn.execute('DROP TABLE IF EXISTS test_pagination');
    await Connection.getInstance().close();
  });

 beforeEach(async () => {
    const conn = Connection.getInstance();
    
    // Fix 1: TRUNCATE the correct table for Repository tests
    await conn.execute('TRUNCATE TABLE test_users_repo'); 
    
    // Fix 2: TRUNCATE the correct table for Paginator tests
    await conn.execute('TRUNCATE TABLE test_pagination'); 

    // Insert 50 test records for PAGINATOR, but use the correct table
    // IF the Paginator tests are using TestUser.query(), you must insert here:
    // This is the source of the failure: Paginator tests call TestUser.query() 
    // which targets 'test_users_repo', but you insert into 'test_pagination'.
    
    const values = Array.from({ length: 50 }, (_, i) => 
        `('user${i + 1}@example.com', 'User ${i + 1}', TRUE)`
    ).join(',');
    
    // Change insertion to use the table defined in TestUser
    await conn.execute(`INSERT INTO test_users_repo (email, name, active) VALUES ${values}`);
  });
  
  test('should paginate results', async () => {
    const query = TestUser.query();
    const result = await Paginator.paginate(query, 1, 10);

    expect(result.data.length).toBe(10);
    expect(result.total).toBe(50);
    expect(result.perPage).toBe(10);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(5);
    expect(result.from).toBe(1);
    expect(result.to).toBe(10);
  });

  test('should get second page', async () => {
    const query = TestUser.query();
    const result = await Paginator.paginate(query, 2, 10);

    expect(result.data.length).toBe(10);
    expect(result.currentPage).toBe(2);
    expect(result.from).toBe(11);
    expect(result.to).toBe(20);
  });

  test('should get last page with remaining items', async () => {
    const query = TestUser.query();
    const result = await Paginator.paginate(query, 5, 10);

    expect(result.data.length).toBe(10);
    expect(result.currentPage).toBe(5);
    expect(result.from).toBe(41);
    expect(result.to).toBe(50);
  });

  test('should handle different page sizes', async () => {
    const query = TestUser.query();
    const result = await Paginator.paginate(query, 1, 25);

    expect(result.data.length).toBe(25);
    expect(result.perPage).toBe(25);
    expect(result.lastPage).toBe(2);
  });

  test('should handle empty results', async () => {
    const conn = Connection.getInstance();
    await conn.execute('TRUNCATE TABLE test_pagination');

    const query = TestUser.query();
    const result = await Paginator.paginate(query, 1, 10);

    expect(result.data.length).toBe(0);
    expect(result.total).toBe(0);
    expect(result.from).toBe(0);
    expect(result.to).toBe(0);
  });

  test('should work with filtered queries', async () => {
    const query = TestUser.query().where('id', '<=', 20);
    const result = await Paginator.paginate(query, 1, 10);

    expect(result.total).toBe(20);
    expect(result.lastPage).toBe(2);
  });
});
