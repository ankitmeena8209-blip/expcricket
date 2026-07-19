export interface PlatformAnalytics {
  activeUsers: number;
  queriesProcessed: number;
  averageResponseTimeMs: number;
}

export class AnalyticsService {
  static async getOverviewStats(): Promise<PlatformAnalytics> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          activeUsers: 1420,
          queriesProcessed: 48920,
          averageResponseTimeMs: 120,
        });
      }, 50);
    });
  }
}
