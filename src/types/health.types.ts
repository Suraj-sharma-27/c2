export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp: string;
  service: string;
  version: string;
}
