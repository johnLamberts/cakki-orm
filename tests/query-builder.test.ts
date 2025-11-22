import { Connection } from "../src/core/connection";
import { QueryBuilder } from "../src/core/query-builder";
import { cleanDatabase, setupTestDatabase, teardownTestDatabase } from "./setup";

describe('QueryBuilder', () => {
  beforeAll(async () => {
    await setupTestDatabase();
    await cleanDatabase();
    
    const conn = Connection.getInstance();
    await conn.query(`
      CREATE TABLE test_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100),
        in_stock BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert test data
    await conn.query(`
      INSERT INTO test_products (name, price, category, in_stock) VALUES
      ('Product A', 10.50, 'Electronics', TRUE),
      ('Product B', 25.00, 'Books', TRUE),
      ('Product C', 15.75, 'Electronics', FALSE),
      ('Product D', 30.00, 'Books', TRUE),
      ('Product E', 5.99, 'Toys', TRUE)
    `);
  });

  afterAll(async () => {
    const conn = Connection.getInstance();
    await conn.query('DROP TABLE test_products');
    await teardownTestDatabase();
  });

  test('should build SELECT query', () => {
    const qb = new QueryBuilder('test_products');
    const { sql } = qb.select('id', 'name').toSQL();
    
    expect(sql).toBe('SELECT id, name FROM test_products');
  });

  test('should build WHERE clause', () => {
    const qb = new QueryBuilder('test_products');
    const { sql, params } = qb
      .where('price', '>', 10)
      .toSQL();
    
    expect(sql).toBe('SELECT * FROM test_products WHERE price > ?');
    expect(params).toEqual([10]);
  });

  test('should build complex WHERE with OR', () => {
    const qb = new QueryBuilder('test_products');
    const { sql, params } = qb
      .where('category', '=', 'Electronics')
      .orWhere('category', '=', 'Books')
      .toSQL();
    
    expect(sql).toBe('SELECT * FROM test_products WHERE category = ? OR category = ?');
    expect(params).toEqual(['Electronics', 'Books']);
  });

  test('should handle IN operator', () => {
    const qb = new QueryBuilder('test_products');
    const { sql, params } = qb
      .where('id', 'IN', [1, 2, 3])
      .toSQL();
    
    expect(sql).toBe('SELECT * FROM test_products WHERE id IN (?, ?, ?)');
    expect(params).toEqual([1, 2, 3]);
  });

  test('should build ORDER BY clause', () => {
    const qb = new QueryBuilder('test_products');
    const { sql } = qb
      .orderBy('price', 'DESC')
      .orderBy('name', 'ASC')
      .toSQL();
    
    expect(sql).toBe('SELECT * FROM test_products ORDER BY price DESC, name ASC');
  });

  test('should build LIMIT and OFFSET', () => {
    const qb = new QueryBuilder('test_products');
    const { sql } = qb.limit(10).offset(5).toSQL();
    
    expect(sql).toBe('SELECT * FROM test_products LIMIT 10 OFFSET 5');
  });

  test('should execute query and return results', async () => {
    const qb = new QueryBuilder('test_products');
    const results = await qb
      .where('category', '=', 'Electronics')
      .orderBy('price', 'ASC')
      .execute();
    
    expect(results.length).toBe(2);
    expect(results[0].name).toBe('Product A');
  });

  test('should return first result', async () => {
    const qb = new QueryBuilder('test_products');
    const result = await qb
      .where('category', '=', 'Books')
      .orderBy('price', 'DESC')
      .first();
    
    expect(result).toBeDefined();
    expect(result?.name).toBe('Product D');
    expect(result?.price).toBe('30.00');
  });

  test('should count results', async () => {
    const qb = new QueryBuilder('test_products');
    const count = await qb.where('in_stock', '=', true).count();
    
    expect(count).toBe(4);
  });

  test('should handle JOIN', async () => {
    const conn = Connection.getInstance();
    
    // Create related table
    await conn.query(`
      CREATE TABLE test_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100)
      )
    `);
    
    await conn.query(`INSERT INTO test_categories (name) VALUES ('Electronics'), ('Books')`);

    const qb = new QueryBuilder('test_products');
    const { sql } = qb
      .select('test_products.*', 'test_categories.name as category_name')
      .join('test_categories', 'test_products.category = test_categories.name')
      .toSQL();
    
    expect(sql).toContain('INNER JOIN test_categories');
    
    await conn.query('DROP TABLE test_categories');
  });

  test('should handle GROUP BY and HAVING', async () => {
    const qb = new QueryBuilder('test_products');
    const { sql } = qb
      .select('category', 'COUNT(*) as count')
      .groupBy('category')
      .having('COUNT(*) > 1')
      .toSQL();
    
    expect(sql).toContain('GROUP BY category');
    expect(sql).toContain('HAVING COUNT(*) > 1');
  });
});
