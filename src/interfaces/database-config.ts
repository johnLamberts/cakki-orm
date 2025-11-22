export interface IDatabaseConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
  connectionLimit?: number;
  queueLimit?: number;
  waitForConnections?: boolean;
  charset?: string;
  timezone?: string;
  multipleStatements?: boolean;
  connectTimeout?: number;
  acquireTimeout?: number;
  idleTimeout?: number;
  enableKeepAlive?: boolean;
  keepAliveInitialDelay?: number;
}
