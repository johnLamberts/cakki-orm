import { TWhereOperator } from "../types/where-operator.type";

export interface IWhereClause {
  field?: string;
  operator: TWhereOperator;
  value?: any;
  logic?: 'AND' | 'OR';
}
