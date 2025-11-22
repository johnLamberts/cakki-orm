import { CreatePostsTable } from "../examples/migrations/create_posts_table";
import { CreateUsersTable } from "../examples/migrations/create_users_table";
import { Post } from "../examples/models/post";
import { User } from "../examples/models/user";
import { Connection } from "../src/core/connection";
import { cleanDatabase, setupTestDatabase, teardownTestDatabase } from "./setup";


describe('Model', () => {
  beforeAll(async () => {
    await setupTestDatabase();
    await cleanDatabase();

    
    // Run migrations
    await new CreateUsersTable().up();
    await new CreatePostsTable().up();
  });

  afterAll(async () => {
    await cleanDatabase();
    await teardownTestDatabase();
  });

  test('should create a new model instance', async () => {
    const user = await User.create({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  test('should find model by ID', async () => {
    const created = await User.create({
      email: 'find@example.com',
      name: 'Find User',
      password: 'password123',
    });

    const found = await User.find(created.id!);
    
    expect(found).toBeDefined();
    expect(found?.email).toBe('find@example.com');
  });

  test('should find model by custom method', async () => {
    await User.create({
      email: 'custom@example.com',
      name: 'Custom User',
      password: 'password123',
    });

    const found = await User.findByEmail('custom@example.com');
    
    expect(found).toBeDefined();
    expect(found?.name).toBe('Custom User');
  });

  test('should update model', async () => {
    const user = await User.create({
      email: 'update@example.com',
      name: 'Original Name',
      password: 'password123',
    });

    user.set('name', 'Updated Name');
    await user.save();

    const updated = await User.find(user.id!);
    expect(updated?.name).toBe('Updated Name');
  });

  test('should delete model', async () => {
    const user = await User.create({
      email: 'delete@example.com',
      name: 'Delete User',
      password: 'password123',
    });

    await user.delete();

    const found = await User.find(user.id!);
    expect(found).toBeNull();
  });

  test('should get all models', async () => {
    // Clear existing
    await Connection.getInstance().query('DELETE FROM users');
    
    await User.create({
      email: 'all1@example.com',
      name: 'User 1',
      password: 'password123',
    });
    
    await User.create({
      email: 'all2@example.com',
      name: 'User 2',
      password: 'password123',
    });

    const all = await User.all();
    expect(all.length).toBe(2);
  });

  test('should handle relationships', async () => {
    const user = await User.create({
      email: 'author@example.com',
      name: 'Author User',
      password: 'password123',
    });

    const post1 = await Post.create({
      user_id: user.id!,
      title: 'First Post',
      content: 'Content here',
      published: true,
    });

    const post2 = await Post.create({
      user_id: user.id!,
      title: 'Second Post',
      content: 'More content',
      published: true,
    });

    const posts = await user.posts();
    expect(posts.length).toBe(2);

    const author = await post1.author();
    expect(author?.id).toBe(user.id);
  });

  test('should bulk insert', async () => {
    await User.insert([
      { email: 'bulk1@example.com', name: 'Bulk 1', password: 'pass' },
      { email: 'bulk2@example.com', name: 'Bulk 2', password: 'pass' },
    ]);

    const bulk1 = await User.findByEmail('bulk1@example.com');
    const bulk2 = await User.findByEmail('bulk2@example.com');

    expect(bulk1).toBeDefined();
    expect(bulk2).toBeDefined();
  });

  test('should bulk update', async () => {
    await User.create({
      email: 'bulkupdate@example.com',
      name: 'Original',
      password: 'pass',
    });

    const affected = await User.updateWhere(
      { name: 'Updated' },
      { email: 'bulkupdate@example.com' }
    );

    expect(affected).toBe(1);

    const updated = await User.findByEmail('bulkupdate@example.com');
    expect(updated?.name).toBe('Updated');
  });
});
