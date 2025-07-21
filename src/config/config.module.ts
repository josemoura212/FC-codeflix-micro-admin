import { Module } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { join } from 'path';

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}) {
    const { envFilePath, ...otherOptions } = options;
    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath)
          ? envFilePath.filter((p): p is string => typeof p === 'string')
          : typeof envFilePath === 'string'
            ? [envFilePath]
            : []),
        join(process.cwd(), '.envs', `.env.${process.env.NODE_ENV}`),
        join(process.cwd(), '.envs', '.env'),
      ],
      ...otherOptions,
    });
  }
}
