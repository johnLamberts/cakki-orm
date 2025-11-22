import { Connection } from "../core/connection";

export abstract class Seeder {
  abstract run(): Promise<void>;

  protected async execute(sql: string, params?: any[]): Promise<void> {
    const conn = Connection.getInstance();
    await conn.query(sql, params);
  }
}
