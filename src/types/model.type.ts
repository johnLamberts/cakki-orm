import { Model } from "../core/model";
import { QueryBuilder } from "../core/query-builder";
import { IModelConfig } from "../interfaces/model-config";

export type ModelConstructor<T, M extends Model<T> = Model<T>> = {
  new (): M;
  getConfig(): IModelConfig;
  find(id: any): Promise<M | null>;
  findOrFail(id: any): Promise<M>;
  all(): Promise<M[]>;
  create(data: Partial<T>): Promise<M>;
  query(): QueryBuilder<M>;
  insert(data: Partial<T> | Partial<T>[]): Promise<void>;
  updateWhere(data: Partial<T>, where?: Record<string, any>): Promise<number>;  delete(where: Record<string, any>): Promise<number>;
  deleteWhere(where: Record<string, any>): Promise<number>;
  delete(where: Record<string, any>): Promise<number>;
  hydrate(data: any): M; 
}
