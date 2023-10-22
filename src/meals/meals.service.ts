import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { FindMealsDto } from './dto/find-meals.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealsRepository: Repository<Meal>,
    private logginService: LoggingService
  ){}
  create(createMealDto: CreateMealDto) {
    this.logginService.log(createMealDto)
    return this.mealsRepository.save(createMealDto);
  }

  findAll(findMealsDto: FindMealsDto, paginationDto: PaginationDto) {
    let meals = this.mealsRepository.find({
      take: paginationDto.limit,
      skip: paginationDto.page,
      where: {
        ...(findMealsDto.chefId && {chef: {id: findMealsDto.chefId}})
      },
      relations: ["chef"]
    })
    return meals
  }

}
