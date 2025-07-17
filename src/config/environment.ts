export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  API_VERSION: string;
}

export const config: EnvConfig = {
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PORT: parseInt(process.env['PORT'] || '3000', 10),
  API_VERSION: process.env['API_VERSION'] || 'v1'
};
