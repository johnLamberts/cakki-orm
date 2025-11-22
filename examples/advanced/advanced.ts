import { Connection } from "../../src/core/connection";
import { DatabaseJobs, JobScheduler } from "../../src/modules/jobs/job-scheduler";
import { IndexManager } from "../../src/modules/schema/index-manager";
import { TriggerManager } from "../../src/modules/schema/trigger-manager";

export async function demonstrateIndexes() {
  await Connection.getInstance().connect();
  
  const indexManager = new IndexManager('users');
  
  // Create indexes
  await indexManager.createIndex('idx_email', 'email');
  await indexManager.createUniqueIndex('idx_username_unique', 'username');
  await indexManager.createIndex('idx_name_email', ['name', 'email']);
  await indexManager.createFulltextIndex('idx_bio_fulltext', 'bio');
  
  // List indexes
  const indexes = await indexManager.listIndexes();
  console.log('Indexes:', indexes);
  
  // Analyze indexes
  const analysis = await indexManager.analyzeIndexes();
  console.log('Index analysis:', analysis);
  
  // Drop index
  await indexManager.dropIndex('idx_email');
}

export async function demonstrateTriggers() {
  await Connection.getInstance().connect();
  
  const triggerManager = new TriggerManager();
  
  // Create audit trigger
  await triggerManager.createAuditTrigger('users');
  
  // Create timestamp trigger
  await triggerManager.createTimestampTrigger('users');
  
  // Create custom trigger
  await triggerManager.createTrigger(
    'validate_email',
    'BEFORE',
    'INSERT',
    'users',
    `
    BEGIN
      IF NEW.email NOT LIKE '%@%.%' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email format';
      END IF;
    END
    `
  );
  
  // List triggers
  const triggers = await triggerManager.listTriggers('users');
  console.log('Triggers:', triggers);
}

export async function demonstrateScheduler() {
  const scheduler = new JobScheduler();
  
  // Register cleanup job (runs every day at midnight)
  scheduler.register({
    id: 'cleanup-old-logs',
    name: 'Cleanup Old Logs',
    schedule: '0 0 * * *',
    handler: DatabaseJobs.cleanupOldRecords('logs', 'created_at', 30),
    enabled: true,
  });
  
  // Register optimization job (runs every week)
  scheduler.register({
    id: 'optimize-tables',
    name: 'Optimize Tables',
    schedule: '0 0 * * 0',
    handler: DatabaseJobs.optimizeTable('users'),
    enabled: true,
  });
  
  // Register statistics update (runs every hour)
  scheduler.register({
    id: 'update-stats',
    name: 'Update Statistics',
    schedule: '0 * * * *',
    handler: DatabaseJobs.updateStatistics('users'),
    enabled: true,
  });
  
  // Custom job
  scheduler.register({
    id: 'send-daily-report',
    name: 'Send Daily Report',
    schedule: '0 9 * * *', // 9 AM daily
    handler: async () => {
      console.log('Generating and sending daily report...');
      // Your custom logic here
    },
    enabled: true,
  });
  
  // Start scheduler
  scheduler.start();
  
  // Run a job immediately
  await scheduler.runNow('cleanup-old-logs');
  
  // Get all jobs
  const jobs = scheduler.getJobs();
  console.log('Registered jobs:', jobs);
  
  // Stop scheduler when done
  // scheduler.stop();
}
