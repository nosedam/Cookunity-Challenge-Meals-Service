import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging/logging.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RequestService } from './request/request.service';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cookunity.db',
      entities: [User],
      synchronize: true,
    }
  ),
    MealsModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    LoggingService, 
    RequestService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
