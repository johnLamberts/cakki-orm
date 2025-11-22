import { Model } from "../core/model";
import { QueryBuilder } from "../core/query-builder";
import { ModelConstructor } from "../types/model.type";

export abstract class Repository<T, M extends Model<T> = Model<T>> {
  protected model: ModelConstructor<T, M>;

  constructor(model: ModelConstructor<T, M>) {
    this.model = model;
  }

  async findById(id: any): Promise<M | null> {
    return await this.model.find(id);
  }

  async findAll(): Promise<M[]> {
    return await this.model.all();
  }

 async findBy<K extends keyof T>(field: K, value: T[K]): Promise<M | null> {
  const row = await this.query()
    .where(field as string, '=', value as any)
    .first();

  return row ? this.model.hydrate(row) : null;
}

async findManyBy<K extends keyof T>(field: K, value: T[K]): Promise<M[]> {
  const rows = await this.query()
    .where(field as string, "=", value as any)
    .execute();

  return rows.map(row => {
    const instance = new this.model(); // create instance
    instance.fill(row as unknown as Partial<T>);  // pass attributes, not Model
    instance['exists'] = true;
    instance['original'] = { ...row };
    return instance;
  });
} 

  async create(data: Partial<T>): Promise<M> {
    return await this.model.create(data);
  }

  async update(id: any, data: Partial<T>): Promise<M | null> {
    const instance = await this.findById(id);
    if (!instance) return null;

    instance.fill(data);
    await instance.save();
    return instance;
  }

  async delete(id: any): Promise<boolean> {
    const instance = await this.findById(id);
    if (!instance) return false;

    await instance.delete();
    return true;
  }

  query(): QueryBuilder<M> {
    return this.model.query();
  }
}
