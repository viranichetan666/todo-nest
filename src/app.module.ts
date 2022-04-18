import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserGuard } from './shared/auth.guard';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return config.getMongoConfig();
      },
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class AppModule { }
