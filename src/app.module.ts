import { ClassSerializerInterceptor, Module, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging/logging.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RequestService } from './request/request.service';
import { MealsModule } from './meals/meals.module';
import { ChefsModule } from './chefs/chefs.module';
import { CustomersModule } from './customers/customers.module';
import { RolesGuard } from './roles/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm.config';
import configuration from './config/configuration';
import { ReviewCreatedEventHandler } from './meals/events/review-created.handler';
import { SqsLambdaEventHandlerService } from './queue/sqs-lambda-handler.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }
    ),
    MealsModule,
    ChefsModule,
    CustomersModule,
    ConfigModule.forRoot({
      load: [configuration],
    })
  ],
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
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ReviewCreatedEventHandler
  ],
})
export class AppModule { }
