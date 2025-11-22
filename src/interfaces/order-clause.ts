import { TOrderDirection } from "../types/order-direction.type";

export interface IOrderClause {
  field: string;
  direction: TOrderDirection;
}
