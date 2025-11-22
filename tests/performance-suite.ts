import { Connection } from "../src/core/connection";
import { Model } from "../src/core/model";
import DataGenerator from "../src/utils/data-generator.utils";
import PerformanceMonitor from "../src/utils/performance.utils";

interface TestUserAttributes {
  id?: number;
  email: string;
  name: string;
  age: number;
  status: string;
  created_at?: Date;
}

class TestUser extends Model<TestUserAttributes> {
  protected static _config = {
    table: 'perf_test_users',
    primaryKey: 'id',
  };
}

export class PerformanceTestSuite {
  private monitor = new PerformanceMonitor();
  private testSizes = [10000, 50000, 100000, 500000, 1000000];

  async setup(): Promise<void> {
    console.log('🔧 Setting up performance test environment...\n');

    Connection.initialize({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'perf_test_db',
      connectionLimit: 20,
    });

    await Connection.getInstance().connect();

    const conn = Connection.getInstance();

    // Drop and recreate table
    await conn.execute('DROP TABLE IF EXISTS perf_test_users');
    await conn.execute(`
      CREATE TABLE perf_test_users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_age (age),
        INDEX idx_status (status),
        INDEX idx_age_status (age, status)
      ) ENGINE=InnoDB
    `);

    console.log('✅ Test environment ready\n');
  }

  async cleanup(): Promise<void> {
    console.log('\n🧹 Cleaning up...');
    const conn = Connection.getInstance();
    await conn.execute('DROP TABLE IF EXISTS perf_test_users');
    await Connection.getInstance().close();
    console.log('✅ Cleanup complete\n');
  }

  async runFullSuite(): Promise<void> {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║     MySQL ORM Performance Test Suite                  ║');
    console.log('║     Testing: 10K → 100K → 500K → 1M records          ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    await this.setup();

    for (const size of this.testSizes) {
      console.log(`\n${'═'.repeat(60)}`);
      console.log(`  TESTING WITH ${size.toLocaleString()} RECORDS`);
      console.log(`${'═'.repeat(60)}\n`);

      await this.testInsertPerformance(size);
      await this.testSelectPerformance(size);
      await this.testWherePerformance(size);
      await this.testJoinPerformance(size);
      await this.testAggregationPerformance(size);
      await this.testIndexPerformance(size);
      await this.testBulkOperations(size);

      // Clear data for next test
      if (size < this.testSizes[this.testSizes.length - 1]) {
        await Connection.getInstance().execute('TRUNCATE TABLE perf_test_users');
      }
    }

    this.monitor.printReport();
    await this.cleanup();
  }

  async testInsertPerformance(recordCount: number): Promise<void> {
    console.log('📝 Test 1: INSERT Performance');
    console.log('━'.repeat(60));

    const batchSize = 1000;

    // Test 1: Single inserts
    console.log(`  • Testing ${Math.min(1000, recordCount)} single inserts...`);
    this.monitor.start('single-insert');
    
    const singleInsertCount = Math.min(1000, recordCount);
    for (let i = 0; i < singleInsertCount; i++) {
      await TestUser.create({
        email: DataGenerator.randomEmail(),
        name: `User ${i}`,
        age: DataGenerator.randomInt(18, 80),
        status: i % 2 === 0 ? 'active' : 'inactive',
      });
    }
    
    this.monitor.end('single-insert', { count: singleInsertCount });
    const singleAvg = this.monitor.getAverageDuration('single-insert');
    console.log(`    ✓ Completed in ${singleAvg.toFixed(2)}ms`);
    console.log(`    ✓ ${(singleInsertCount / (singleAvg / 1000)).toFixed(0)} inserts/sec`);

    // Test 2: Bulk insert
    console.log(`  • Testing bulk insert of ${recordCount - singleInsertCount} records...`);
    this.monitor.start('bulk-insert');

    const remainingCount = recordCount - singleInsertCount;
    const users = DataGenerator.generateBulkData(remainingCount, () => ({
      email: DataGenerator.randomEmail(),
      name: `User ${DataGenerator.randomString(6)}`,
      age: DataGenerator.randomInt(18, 80),
      status: DataGenerator.randomBoolean() ? 'active' : 'inactive',
    }));

    // Insert in batches
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await TestUser.insert(batch);
      
      if ((i + batchSize) % 10000 === 0) {
        process.stdout.write(`\r    Progress: ${((i / users.length) * 100).toFixed(1)}%`);
      }
    }
    
    this.monitor.end('bulk-insert', { count: remainingCount });
    
    // Fixed: Add null check for metrics
    const bulkMetrics = this.monitor.getMetrics('bulk-insert');
    const bulkDuration = bulkMetrics[0]?.duration || 0;
    
    console.log(`\r    ✓ Completed in ${bulkDuration.toFixed(2)}ms`);
    console.log(`    ✓ ${(remainingCount / (bulkDuration / 1000)).toFixed(0)} inserts/sec`);
    console.log(`    ✓ Bulk insert is ${(singleAvg / (bulkDuration / remainingCount)).toFixed(0)}x faster\n`);
  }

  async testSelectPerformance(recordCount: number): Promise<void> {
    console.log('🔍 Test 2: SELECT Performance');
    console.log('━'.repeat(60));

    // Test 1: SELECT *
    console.log('  • Testing SELECT * LIMIT 1000...');
    this.monitor.start('select-all');
    await TestUser.query().limit(1000).execute();
    this.monitor.end('select-all');
    
    const selectAllMetrics = this.monitor.getMetrics('select-all');
    const selectAllTime = selectAllMetrics[0]?.duration || 0;
    console.log(`    ✓ Completed in ${selectAllTime.toFixed(2)}ms\n`);

    // Test 2: SELECT specific columns
    console.log('  • Testing SELECT id, email LIMIT 1000...');
    this.monitor.start('select-columns');
    await TestUser.query().select('id', 'email').limit(1000).execute();
    this.monitor.end('select-columns');
    
    const selectColumnsMetrics = this.monitor.getMetrics('select-columns');
    const selectColumnsTime = selectColumnsMetrics[0]?.duration || 1; // Avoid division by zero
    
    console.log(`    ✓ Completed in ${selectColumnsTime.toFixed(2)}ms`);
    console.log(`    ✓ ${((selectAllTime / selectColumnsTime) * 100 - 100).toFixed(0)}% faster than SELECT *\n`);

    // Test 3: findById
    console.log('  • Testing findById (100 random IDs)...');
    this.monitor.start('find-by-id');
    for (let i = 0; i < 100; i++) {
      await TestUser.find(DataGenerator.randomInt(1, Math.min(recordCount, 10000)));
    }
    this.monitor.end('find-by-id', { count: 100 });
    const findByIdAvg = this.monitor.getAverageDuration('find-by-id');
    console.log(`    ✓ Average: ${findByIdAvg.toFixed(2)}ms per query\n`);
  }

  async testWherePerformance(recordCount: number): Promise<void> {
    console.log('🎯 Test 3: WHERE Clause Performance');
    console.log('━'.repeat(60));

    // Test 1: Simple WHERE
    console.log('  • Testing WHERE age > 30 LIMIT 1000...');
    this.monitor.start('where-simple');
    await TestUser.query().where('age', '>', 30).limit(1000).execute();
    this.monitor.end('where-simple');
    
    const whereSimpleMetrics = this.monitor.getMetrics('where-simple');
    console.log(`    ✓ ${(whereSimpleMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    // Test 2: Complex WHERE
    console.log('  • Testing WHERE age > 30 AND status = "active" LIMIT 1000...');
    this.monitor.start('where-complex');
    await TestUser.query()
      .where('age', '>', 30)
      .where('status', '=', 'active')
      .limit(1000)
      .execute();
    this.monitor.end('where-complex');
    
    const whereComplexMetrics = this.monitor.getMetrics('where-complex');
    console.log(`    ✓ ${(whereComplexMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    // Test 3: WHERE IN
    const ids = Array.from({ length: 100 }, () => DataGenerator.randomInt(1, recordCount));
    console.log('  • Testing WHERE id IN (...100 ids)...');
    this.monitor.start('where-in');
    await TestUser.query().whereIn('id', ids).execute();
    this.monitor.end('where-in');
    
    const whereInMetrics = this.monitor.getMetrics('where-in');
    console.log(`    ✓ ${(whereInMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    // Test 4: LIKE query
    console.log('  • Testing WHERE email LIKE "%test%"...');
    this.monitor.start('where-like');
    await TestUser.query().where('email', 'LIKE', '%test%').limit(1000).execute();
    this.monitor.end('where-like');
    
    const whereLikeMetrics = this.monitor.getMetrics('where-like');
    console.log(`    ✓ ${(whereLikeMetrics[0]?.duration || 0).toFixed(2)}ms\n`);
  }

  async testJoinPerformance(recordCount: number): Promise<void> {
    console.log('🔗 Test 4: JOIN Performance');
    console.log('━'.repeat(60));

    const conn = Connection.getInstance();

    // Create related table
    await conn.execute('DROP TABLE IF EXISTS perf_test_orders');
    await conn.execute(`
      CREATE TABLE perf_test_orders (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT UNSIGNED NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB
    `);

    // Insert orders (10% of users)
    const orderCount = Math.floor(recordCount * 0.1);
    console.log(`  • Inserting ${orderCount.toLocaleString()} orders...`);
    const orders = Array.from({ length: orderCount }, () => ({
      user_id: DataGenerator.randomInt(1, recordCount),
      amount: DataGenerator.randomInt(10, 1000),
    }));

    const batchSize = 1000;
    for (let i = 0; i < orders.length; i += batchSize) {
      const batch = orders.slice(i, i + batchSize);
      const values = batch.map(o => `(${o.user_id}, ${o.amount})`).join(',');
      await conn.execute(`INSERT INTO perf_test_orders (user_id, amount) VALUES ${values}`);
    }
    console.log('    ✓ Orders inserted\n');

    // Test JOIN
    console.log('  • Testing LEFT JOIN with 1000 users...');
    this.monitor.start('join-query');
    await conn.query(`
      SELECT u.*, COUNT(o.id) as order_count, SUM(o.amount) as total_spent
      FROM perf_test_users u
      LEFT JOIN perf_test_orders o ON u.id = o.user_id
      GROUP BY u.id
      LIMIT 1000
    `);
    this.monitor.end('join-query');
    
    const joinMetrics = this.monitor.getMetrics('join-query');
    console.log(`    ✓ ${(joinMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    await conn.execute('DROP TABLE perf_test_orders');
  }

  async testAggregationPerformance(recordCount: number): Promise<void> {
    console.log('📊 Test 5: Aggregation Performance');
    console.log('━'.repeat(60));

    // Test COUNT
    console.log('  • Testing COUNT(*)...');
    this.monitor.start('count');
    await TestUser.query().count();
    this.monitor.end('count');
    
    const countMetrics = this.monitor.getMetrics('count');
    console.log(`    ✓ ${(countMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    // Test AVG
    console.log('  • Testing AVG(age)...');
    this.monitor.start('avg');
    await TestUser.query().avg('age');
    this.monitor.end('avg');
    
    const avgMetrics = this.monitor.getMetrics('avg');
    console.log(`    ✓ ${(avgMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    // Test GROUP BY
    console.log('  • Testing GROUP BY status...');
    this.monitor.start('group-by');
    await TestUser.query()
      .select('status', 'COUNT(*) as count', 'AVG(age) as avg_age')
      .groupBy('status')
      .execute();
    this.monitor.end('group-by');
    
    const groupByMetrics = this.monitor.getMetrics('group-by');
    console.log(`    ✓ ${(groupByMetrics[0]?.duration || 0).toFixed(2)}ms\n`);
  }

  async testIndexPerformance(recordCount: number): Promise<void> {
    console.log('🔑 Test 6: Index Performance');
    console.log('━'.repeat(60));

    const conn = Connection.getInstance();

    // Test without index
    await conn.execute('DROP INDEX idx_name ON perf_test_users');
    console.log('  • Testing WHERE name LIKE "User%" (no index)...');
    this.monitor.start('no-index');
    await TestUser.query().where('name', 'LIKE', 'User%').limit(1000).execute();
    this.monitor.end('no-index');
    
    const noIndexMetrics = this.monitor.getMetrics('no-index');
    const noIndexTime = noIndexMetrics[0]?.duration || 0;
    console.log(`    ✓ ${noIndexTime.toFixed(2)}ms\n`);

    // Test with index
    await conn.execute('CREATE INDEX idx_name ON perf_test_users(name)');
    console.log('  • Testing WHERE name LIKE "User%" (with index)...');
    this.monitor.start('with-index');
    await TestUser.query().where('name', 'LIKE', 'User%').limit(1000).execute();
    this.monitor.end('with-index');
    
    const withIndexMetrics = this.monitor.getMetrics('with-index');
    const withIndexTime = withIndexMetrics[0]?.duration || 1; // Avoid division by zero
    
    console.log(`    ✓ ${withIndexTime.toFixed(2)}ms`);
    console.log(`    ✓ ${((noIndexTime / withIndexTime) - 1).toFixed(1)}x faster with index\n`);
  }

  async testBulkOperations(recordCount: number): Promise<void> {
    console.log('⚡ Test 7: Bulk Operations');
    console.log('━'.repeat(60));

    // Test bulk UPDATE
    console.log('  • Testing bulk UPDATE (1000 records)...');
    this.monitor.start('bulk-update');
    await TestUser.updateWhere(
      { status: 'updated' },
      { status: 'active' }
    );
    this.monitor.end('bulk-update');
    
    const bulkUpdateMetrics = this.monitor.getMetrics('bulk-update');
    console.log(`    ✓ ${(bulkUpdateMetrics[0]?.duration || 0).toFixed(2)}ms\n`);

    // Test bulk DELETE
    console.log('  • Testing bulk DELETE (inactive users)...');
    this.monitor.start('bulk-delete');
    const deleted = await TestUser.deleteWhere({ status: 'inactive' });
    this.monitor.end('bulk-delete');
    
    const bulkDeleteMetrics = this.monitor.getMetrics('bulk-delete');
    console.log(`    ✓ Deleted ${deleted} records in ${(bulkDeleteMetrics[0]?.duration || 0).toFixed(2)}ms\n`);
  }

  async runQuickTest(): Promise<void> {
    console.log('⚡ Running Quick Performance Test (10K records)\n');
    await this.setup();
    await this.testInsertPerformance(10000);
    await this.testSelectPerformance(10000);
    await this.testWherePerformance(10000);
    this.monitor.printReport();
    await this.cleanup();
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const suite = new PerformanceTestSuite();

  try {
    if (args.includes('--quick')) {
      await suite.runQuickTest();
    } else {
      await suite.runFullSuite();
    }
  } catch (error) {
    console.error('\n❌ Error during performance tests:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
