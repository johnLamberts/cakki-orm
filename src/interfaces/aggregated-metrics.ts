export interface AggregatedMetrics {
  name: string;
  count: number;
  totalDuration: number;
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  lastExecuted: Date;
}
