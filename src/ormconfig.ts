import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import loadEnvConfig from './shared/config/loadEnv.config';
import { EnvEnum } from './shared/enums/env.enum';

// 通过dotENV来解析不同的配置
export function buildConnectionOptions() {
  const config = loadEnvConfig();
  const entitiesDir = [__dirname + '/**/*.entity{.ts,.js}'];
  return {
    type: 'mysql',
    host: config[EnvEnum.DB_HOST],
    port: config[EnvEnum.DB_PORT],
    username: config[EnvEnum.DB_USERNAME],
    password: config[EnvEnum.DB_PASSWORD],
    database: config[EnvEnum.DB_DATABASE],
    synchronize: config[EnvEnum.DB_SYNC],
    entities: entitiesDir,
    dateStrings: true,
    logging:
      process.env.NODE_ENV !== 'development' ? 'file' : ['query', 'error'],
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOptions();

export default new DataSource({
  ...connectionParams,
  migrations: ['migrations/**'],
  subscribers: [],
} as DataSourceOptions);
