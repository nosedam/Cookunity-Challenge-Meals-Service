import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { RequestService } from 'src/request/request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  controllers: [MealsController],
  providers: [MealsService, RequestService],
  exports: [MealsService]
})
export class MealsModule {}
