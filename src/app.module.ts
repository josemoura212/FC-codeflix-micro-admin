import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoriesModule, DatabaseModule],
})
export class AppModule {}
