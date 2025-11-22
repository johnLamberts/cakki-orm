import { Connection } from "../src/core/connection";
import { Model } from "../src/core/model";
import { Repository } from "../src/modules/repository";

interface TestUserAttributes {
  id?: number;
  email: string;
  name: string;
  active?: boolean;
}

export class TestUser extends Model<TestUserAttributes> {
  protected static _config = {
    table: 'test_users_repo',
    primaryKey: 'id',
  };
}

export class TestUserRepository extends Repository<TestUserAttributes, TestUser> {
  constructor() {
    super(TestUser as any);
  }

  async findByEmail(email: string): Promise<TestUser | null> {
    return await this.query()
      .where('email', '=', email)
      .first() as TestUser | null;
  }

  async findActiveUsers(): Promise<TestUser[]> {
    return await this.query()
      .where('active', '=', true)
      .execute() as TestUser[];
  }
}

describe('Repository', () => {
  let repo: TestUserRepository;

  beforeAll(async () => {
    Connection.initialize({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'test_db',
    });
    await Connection.getInstance().connect();

    const conn = Connection.getInstance();
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS test_users_repo (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE
      )
    `);
  });

  afterAll(async () => {
    const conn = Connection.getInstance();
    await conn.execute('DROP TABLE IF EXISTS test_users_repo');
    await Connection.getInstance().close();
  });

  beforeEach(async () => {
    const conn = Connection.getInstance();
    await conn.execute('TRUNCATE TABLE test_users_repo');
    repo = new TestUserRepository();
  });

  test('should create a record via repository', async () => {
    const user = await repo.create({
      email: 'test@example.com',
      name: 'Test User',
    });

    expect(user.get('id')).toBeDefined();
    expect(user.get('email')).toBe('test@example.com');
  });

  test('should find record by id', async () => {
    const created = await repo.create({
      email: 'find@example.com',
      name: 'Find User',
    });

    const found = await repo.findById(created.get('id')!);
    expect(found).not.toBeNull();
    expect(found?.get('email')).toBe('find@example.com');
  });

  test('should find all records', async () => {
    await repo.create({ email: 'user1@example.com', name: 'User 1' });
    await repo.create({ email: 'user2@example.com', name: 'User 2' });
    await repo.create({ email: 'user3@example.com', name: 'User 3' });

    const all = await repo.findAll();
    expect(all.length).toBe(3);
  });

  test('should update record via repository', async () => {
    const user = await repo.create({
      email: 'update@example.com',
      name: 'Original Name',
    });

    const updated = await repo.update(user.get('id')!, {
      name: 'Updated Name',
    });

    expect(updated).not.toBeNull();
    expect(updated?.get('name')).toBe('Updated Name');
  });

  test('should delete record via repository', async () => {
    const user = await repo.create({
      email: 'delete@example.com',
      name: 'Delete User',
    });

    const result = await repo.delete(user.get('id')!);
    expect(result).toBe(true);

    const notFound = await repo.findById(user.get('id')!);
    expect(notFound).toBeNull();
  });

  test('should find by column', async () => {
    await repo.create({ email: 'custom@example.com', name: 'Custom User', active: true });

    const found = await repo.findBy("email", 'custom@example.com');
    expect(found).not.toBeNull();
    expect(found?.get('name')).toBe('Custom User');
  });

  test('should find multiple records by a field using findByMany', async () => {
  // Create some users
    await repo.create({ email: 'multi1@example.com', name: 'Multi User 1', active: true });
    await repo.create({ email: 'multi2@example.com', name: 'Multi User 2', active: true });
    await repo.create({ email: 'multi1@example.com', name: 'Multi User 3', active: true });

    // Use findByMany to get all users with email 'multi1@example.com'
    const foundUsers = await repo.findManyBy('email', 'multi1@example.com');

    expect(foundUsers.length).toBe(2); // There are 2 users with that email
    expect(foundUsers[0]).toBeInstanceOf(TestUser);
    expect(foundUsers[1]).toBeInstanceOf(TestUser);

    // Check that names match
    const names = foundUsers.map(u => u.get('name'));
    expect(names).toContain('Multi User 1');
    expect(names).toContain('Multi User 3');
  });

  test('should filter active users', async () => {
    await repo.create({ email: 'active1@example.com', name: 'Active 1', active: true });
    await repo.create({ email: 'inactive@example.com', name: 'Inactive', active: false });
    await repo.create({ email: 'active2@example.com', name: 'Active 2', active: true });

    const activeUsers = await repo.findActiveUsers();
    expect(activeUsers.length).toBe(2);
  });

  test('should use query builder through repository', async () => {
    await repo.create({ email: 'query1@example.com', name: 'Query User 1' });
    await repo.create({ email: 'query2@example.com', name: 'Query User 2' });

    const results = await repo.query()
      .select('email', 'name')
      .where('email', 'LIKE', 'query%')
      .orderBy('name', 'ASC')
      .execute();

    expect(results.length).toBe(2);
  });
});

