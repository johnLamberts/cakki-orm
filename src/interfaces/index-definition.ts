import { TIndexType } from "../types/index.type";

export interface IndexDefinition {
  name: string;
  columns?: string[];
  type?: TIndexType;
  unique?: boolean;
  fullText?: boolean;
}
