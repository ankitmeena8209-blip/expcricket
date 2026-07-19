export interface SystemLog {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SECURITY";
  module: string;
  message: string;
  ip?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "SUPER_ADMIN" | "ANALYST" | "MODERATOR";
  lastLogin: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export interface SystemMetrics {
  cpuUsagePct: number;
  memoryUsagePct: number;
  activeSessions: number;
  apiRequestsPerMin: number;
  aiCacheHitRatePct: number;
  databaseConnections: number;
}
