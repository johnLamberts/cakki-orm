import { Connection } from "./connection";
import { SchemaBuilder } from "./schema-builder";

export abstract class Migration {
  abstract up(): Promise<void>;
  abstract down(): Promise<void>;

  protected async execute(sql: string): Promise<void> {
    const conn = Connection.getInstance();
    await conn.query(sql);
  }

  protected async createTable(name: string, callback: (table: SchemaBuilder) => void): Promise<void> {
    const builder = new SchemaBuilder(name);
    callback(builder);
    await this.execute(builder.toCreateSQL());
  }

  protected async dropTable(name: string): Promise<void> {
    await this.execute(`DROP TABLE IF EXISTS ${name}`);
  }

  protected async addColumn(table: string, column: string, definition: string): Promise<void> {
    await this.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }

  protected async dropColumn(table: string, column: string): Promise<void> {
    await this.execute(`ALTER TABLE ${table} DROP COLUMN ${column}`);
  }
}
