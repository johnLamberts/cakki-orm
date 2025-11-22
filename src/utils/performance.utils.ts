import { AggregatedMetrics } from "../interfaces/aggregated-metrics";
import { PerformanceMetric } from "../interfaces/performance-metric";

export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]> = new Map();
  private activeTimers: Map<string, number> = new Map();
  private enabled: boolean = true;

  /**
   * Enable or disable performance monitoring
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Start timing an operation
   */
  start(operationName: string, metadata?: Record<string, any>): void {
    if (!this.enabled) return;

    const startTime = performance.now();
    this.activeTimers.set(operationName, startTime);

    if (!this.metrics.has(operationName)) {
      this.metrics.set(operationName, []);
    }

    this.metrics.get(operationName)!.push({
      name: operationName,
      startTime,
      metadata,
      timestamp: new Date(),
    });
  }

  /**
   * End timing an operation
   */
  end(operationName: string, metadata?: Record<string, any>): number {
    if (!this.enabled) return 0;

    const endTime = performance.now();
    const startTime = this.activeTimers.get(operationName);

    if (!startTime) {
      console.warn(`⚠️  No start time found for operation: ${operationName}`);
      return 0;
    }

    const duration = endTime - startTime;
    this.activeTimers.delete(operationName);

    // Update the last metric with end time and duration
    const metrics = this.metrics.get(operationName);
    if (metrics && metrics.length > 0) {
      const lastMetric = metrics[metrics.length - 1];
      lastMetric.endTime = endTime;
      lastMetric.duration = duration;
      
      if (metadata) {
        lastMetric.metadata = { ...lastMetric.metadata, ...metadata };
      }
    }

    return duration;
  }

  /**
   * Measure a synchronous operation
   */
  measure<T>(operationName: string, fn: () => T, metadata?: Record<string, any>): T {
    this.start(operationName, metadata);
    try {
      const result = fn();
      this.end(operationName);
      return result;
    } catch (error) {
      this.end(operationName, { error: true });
      throw error;
    }
  }

  /**
   * Measure an asynchronous operation
   */
  async measureAsync<T>(
    operationName: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    this.start(operationName, metadata);
    try {
      const result = await fn();
      this.end(operationName);
      return result;
    } catch (error) {
      this.end(operationName, { error: true });
      throw error;
    }
  }

  /**
   * Get all metrics for a specific operation
   */
  getMetrics(operationName: string): PerformanceMetric[] {
    return this.metrics.get(operationName) || [];
  }

  /**
   * Get all recorded metrics
   */
  getAllMetrics(): Map<string, PerformanceMetric[]> {
    return this.metrics;
  }

  /**
   * Get aggregated statistics for an operation
   */
  getAggregatedMetrics(operationName: string): AggregatedMetrics | null {
    const metrics = this.getMetrics(operationName);
    
    if (metrics.length === 0) {
      return null;
    }

    const completedMetrics = metrics.filter(m => m.duration !== undefined);
    
    if (completedMetrics.length === 0) {
      return null;
    }

    const durations = completedMetrics.map(m => m.duration!);
    const totalDuration = durations.reduce((sum, d) => sum + d, 0);

    return {
      name: operationName,
      count: completedMetrics.length,
      totalDuration,
      averageDuration: totalDuration / completedMetrics.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      lastExecuted: completedMetrics[completedMetrics.length - 1].timestamp,
    };
  }

  /**
   * Get average duration for an operation
   */
  getAverageDuration(operationName: string): number {
    const aggregated = this.getAggregatedMetrics(operationName);
    return aggregated ? aggregated.averageDuration : 0;
  }

  /**
   * Get the slowest operations
   */
  getSlowestOperations(limit: number = 10): AggregatedMetrics[] {
    const allAggregated: AggregatedMetrics[] = [];

    for (const [name] of this.metrics) {
      const aggregated = this.getAggregatedMetrics(name);
      if (aggregated) {
        allAggregated.push(aggregated);
      }
    }

    return allAggregated
      .sort((a, b) => b.averageDuration - a.averageDuration)
      .slice(0, limit);
  }

  /**
   * Get the most frequent operations
   */
  getMostFrequentOperations(limit: number = 10): AggregatedMetrics[] {
    const allAggregated: AggregatedMetrics[] = [];

    for (const [name] of this.metrics) {
      const aggregated = this.getAggregatedMetrics(name);
      if (aggregated) {
        allAggregated.push(aggregated);
      }
    }

    return allAggregated
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
    this.activeTimers.clear();
  }

  /**
   * Clear metrics for a specific operation
   */
  clearOperation(operationName: string): void {
    this.metrics.delete(operationName);
    this.activeTimers.delete(operationName);
  }

  /**
   * Print a detailed performance report
   */
  printReport(): void {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║          PERFORMANCE MONITORING REPORT                ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const slowest = this.getSlowestOperations(10);
    const frequent = this.getMostFrequentOperations(10);

    // Slowest Operations
    console.log('🐌 SLOWEST OPERATIONS (by average duration)');
    console.log('━'.repeat(60));
    
    if (slowest.length === 0) {
      console.log('  No operations recorded\n');
    } else {
      slowest.forEach((op, index) => {
        console.log(`  ${index + 1}. ${op.name}`);
        console.log(`     Avg: ${op.averageDuration.toFixed(2)}ms | Min: ${op.minDuration.toFixed(2)}ms | Max: ${op.maxDuration.toFixed(2)}ms`);
        console.log(`     Executions: ${op.count} | Total: ${op.totalDuration.toFixed(2)}ms\n`);
      });
    }

    // Most Frequent Operations
    console.log('🔥 MOST FREQUENT OPERATIONS');
    console.log('━'.repeat(60));
    
    if (frequent.length === 0) {
      console.log('  No operations recorded\n');
    } else {
      frequent.forEach((op, index) => {
        console.log(`  ${index + 1}. ${op.name}`);
        console.log(`     Executions: ${op.count} | Avg: ${op.averageDuration.toFixed(2)}ms`);
        console.log(`     Total Time: ${op.totalDuration.toFixed(2)}ms\n`);
      });
    }

    // Summary Statistics
    const allMetrics = Array.from(this.metrics.values()).flat();
    const completedMetrics = allMetrics.filter(m => m.duration !== undefined);
    
    if (completedMetrics.length > 0) {
      const totalDuration = completedMetrics.reduce((sum, m) => sum + m.duration!, 0);
      const avgDuration = totalDuration / completedMetrics.length;

      console.log('📊 OVERALL STATISTICS');
      console.log('━'.repeat(60));
      console.log(`  Total Operations: ${completedMetrics.length}`);
      console.log(`  Total Time: ${totalDuration.toFixed(2)}ms (${(totalDuration / 1000).toFixed(2)}s)`);
      console.log(`  Average Duration: ${avgDuration.toFixed(2)}ms`);
      console.log(`  Unique Operations: ${this.metrics.size}\n`);
    }
  }

  /**
   * Print a summary for a specific operation
   */
  printOperationSummary(operationName: string): void {
    const aggregated = this.getAggregatedMetrics(operationName);

    if (!aggregated) {
      console.log(`\n⚠️  No metrics found for operation: ${operationName}\n`);
      return;
    }

    console.log(`\n📊 OPERATION SUMMARY: ${operationName}`);
    console.log('━'.repeat(60));
    console.log(`  Executions: ${aggregated.count}`);
    console.log(`  Average Duration: ${aggregated.averageDuration.toFixed(2)}ms`);
    console.log(`  Min Duration: ${aggregated.minDuration.toFixed(2)}ms`);
    console.log(`  Max Duration: ${aggregated.maxDuration.toFixed(2)}ms`);
    console.log(`  Total Duration: ${aggregated.totalDuration.toFixed(2)}ms`);
    console.log(`  Last Executed: ${aggregated.lastExecuted.toLocaleString()}\n`);

    // Show percentile distribution
    const metrics = this.getMetrics(operationName);
    const durations = metrics
      .filter(m => m.duration !== undefined)
      .map(m => m.duration!)
      .sort((a, b) => a - b);

    if (durations.length > 0) {
      console.log('  Percentiles:');
      console.log(`    P50: ${this.getPercentile(durations, 50).toFixed(2)}ms`);
      console.log(`    P75: ${this.getPercentile(durations, 75).toFixed(2)}ms`);
      console.log(`    P90: ${this.getPercentile(durations, 90).toFixed(2)}ms`);
      console.log(`    P95: ${this.getPercentile(durations, 95).toFixed(2)}ms`);
      console.log(`    P99: ${this.getPercentile(durations, 99).toFixed(2)}ms\n`);
    }
  }

  /**
   * Calculate percentile value
   */
  private getPercentile(sortedArray: number[], percentile: number): number {
    const index = Math.ceil((percentile / 100) * sortedArray.length) - 1;
    return sortedArray[Math.max(0, index)];
  }

  /**
   * Export metrics to JSON
   */
  exportToJSON(): string {
    const data: Record<string, any> = {};

    for (const [name, metrics] of this.metrics) {
      const aggregated = this.getAggregatedMetrics(name);
      data[name] = {
        aggregated,
        metrics: metrics.map(m => ({
          duration: m.duration,
          metadata: m.metadata,
          timestamp: m.timestamp,
        })),
      };
    }

    return JSON.stringify(data, null, 2);
  }

  /**
   * Get metrics in a format suitable for charting/visualization
   */
  getChartData(operationName: string): { timestamps: Date[], durations: number[] } {
    const metrics = this.getMetrics(operationName);
    const completedMetrics = metrics.filter(m => m.duration !== undefined);

    return {
      timestamps: completedMetrics.map(m => m.timestamp),
      durations: completedMetrics.map(m => m.duration!),
    };
  }
}

// Singleton instance for global use
export const globalMonitor = new PerformanceMonitor();

// Decorator for measuring method execution time
export function Monitored(operationName?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const name = operationName || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: any[]) {
      return await globalMonitor.measureAsync(name, () => originalMethod.apply(this, args));
    };

    return descriptor;
  };
}

export default PerformanceMonitor;
