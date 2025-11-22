import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { Connection } from "./connection";

export class Transaction {
  private _connection?: PoolConnection;
  private completed = false;


  constructor(connection: PoolConnection) {
    this._connection = connection;
  }

  async begin(): Promise<void> {
    if(!this._connection) return;

    await this._connection?.beginTransaction();
  }


  async commit(): Promise<void> {
    if(this.completed) {
      throw new Error('Transaction already completed')
    }

    await this._connection?.commit();
    this.completed = true;
    this._connection?.release();
  }

  async rollback(): Promise<void> {
     if(this.completed) {
      throw new Error('Transaction already completed')
    }

    await this._connection?.rollback();
    this.completed = true;
    this._connection?.release();
  }

  async query<T = any>(sql: string, values?: any[]): Promise<T[]> {
    if (!this._connection) {
    throw new Error("Database connection not established");
  }

  const [rows] = await this._connection.execute<RowDataPacket[]>(sql, values);
  return rows as unknown as T[];
  }

  static async run<T>(callback: (trx: Transaction) => Promise<T>): Promise<T> {
    const conn = Connection.getInstance();
    const connection = await conn.getConnection();

    const trx = new Transaction(connection);

    try {
      await trx.begin();
      const result = await callback(trx);
      await trx.commit();
      return result;
    } catch(error) {
      await trx.rollback();
      throw error;
    }
  } 
}
