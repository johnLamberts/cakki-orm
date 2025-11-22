export interface IModelConfig {
  table: string;
  primaryKey?: string;
  timestamps?: boolean;
  softDeletes?: boolean;
  fillable?: string[]; 
  guarded?: string[];
  casts?: Record<string, 'number' | 'boolean' | 'date' | 'json' | string>;
  hidden?: string[];
}
