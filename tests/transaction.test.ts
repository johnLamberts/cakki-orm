import { CreateUsersTable } from '../examples/migrations/create_users_table';
import { User } from '../examples/models/user';
import { Transaction } from '../src/core/transaction';
import { cleanDatabase, setupTestDatabase, teardownTestDatabase } from './setup';

describe('Transaction', () => {
  beforeAll(async () => {
    await setupTestDatabase();
    await cleanDatabase();
    await new CreateUsersTable().up();
  });

  afterAll(async () => {
    await cleanDatabase();
    await teardownTestDatabase();
  });

  test('should commit transaction', async () => {
    const result = await Transaction.run(async (trx) => {
      await trx.query(
        'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
        ['trx1@example.com', 'Transaction User 1', 'pass']
      );

      await trx.query(
        'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
        ['trx2@example.com', 'Transaction User 2', 'pass']
      );

      return 'success';
    });

    expect(result).toBe('success');

    const user1 = await User.findByEmail('trx1@example.com');
    const user2 = await User.findByEmail('trx2@example.com');

    expect(user1).toBeDefined();
    expect(user2).toBeDefined();
  });

  test('should rollback transaction on error', async () => {
    try {
      await Transaction.run(async (trx) => {
        await trx.query(
          'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
          ['rollback@example.com', 'Rollback User', 'pass']
        );

        throw new Error('Intentional error');
      });
    } catch (error) {
      expect(error).toBeDefined();
    }

    const user = await User.findByEmail('rollback@example.com');
    expect(user).toBeNull();
  });
});
