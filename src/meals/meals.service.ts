import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { FindMealsDto } from './dto/find-meals.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RequestService } from 'src/request/request.service';
import { Chef } from 'src/chefs/entities/chef.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealsRepository: Repository<Meal>,
    private requestService: RequestService
  ){}
  create(createMealDto: CreateMealDto) {
    return this.mealsRepository.save(createMealDto);
  }

  findAll(findMealsDto: FindMealsDto, paginationDto: PaginationDto) {
    let meals = this.mealsRepository.createQueryBuilder("meals")


    if (findMealsDto.chefId) {
      meals = meals.where("meals.chefId = :chefId", {chefId: findMealsDto.chefId})
    }

    meals = meals.take(paginationDto.page).limit(paginationDto.limit)

    return meals.getMany()
  }

}
