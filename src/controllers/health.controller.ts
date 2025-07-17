import { Request, Response } from 'express';
import { HealthCheckResponse } from '../types';
import { config } from '../config/environment';

export class HealthController {
  public static getHealthCheck(_req: Request, res: Response): void {
    const healthResponse: HealthCheckResponse = {
      status: 'healthy',
      message: 'Hi! Everything is running smoothly at Campus Connect. All systems operational and ready to serve students.',
      timestamp: new Date().toISOString(),
      service: 'Campus Connect Backend',
      version: config.API_VERSION
    };

    res.status(200).json({
      success: true,
      data: healthResponse,
      timestamp: new Date().toISOString()
    });
  }
}
