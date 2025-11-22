import { TJoinType } from "../types/join.type";

export interface IJoinClause {
  type: TJoinType;
  table: string;
  on: string;
}

