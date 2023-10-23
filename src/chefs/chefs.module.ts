import { Module } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { ChefsController } from './chefs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from './entities/chef.entity';
import { MealsModule } from 'src/meals/meals.module';
import { RequestService } from 'src/request/request.service';
import { LoggingService } from 'src/logging/logging.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chef]), MealsModule, UsersModule],
  controllers: [ChefsController],
  providers: [ChefsService, RequestService, LoggingService],
})
export class ChefsModule {}
