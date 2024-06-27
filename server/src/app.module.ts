import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AtGuard, UserCheckGuard } from './common/guards';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { StorageModule } from './storage/storage.module';
import { SharpInterceptor } from './Interceptor/sharp-interceptor';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    StorageModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserCheckGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SharpInterceptor,
    },
  ],
})
export class AppModule {}
