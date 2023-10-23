import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { FindMealsDto } from './dto/find-meals.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { plainToInstance } from 'class-transformer';
import { Chef } from 'src/chefs/entities/chef.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealsRepository: Repository<Meal>
  ) { }

  async create(createMealDto: CreateMealDto) {
    let mealResult = await this.mealsRepository.save(createMealDto)
    let meal = plainToInstance(Meal, mealResult)
    const chef = plainToInstance(Chef, mealResult.chef)
    meal.chef = chef
    return meal;
  }

  findAll(findMealsDto: FindMealsDto, paginationDto: PaginationDto) {
    let meals = this.mealsRepository.find({
      take: paginationDto.limit,
      skip: paginationDto.skip,
      where: {
        ...(findMealsDto.chefId && { chef: { id: findMealsDto.chefId } })
      },
      relations: ["chef"]
    })
    return meals
  }

  async updateRating(updateRatingDto: UpdateRatingDto) {

    const meal = await this.mealsRepository.findOneBy({ id: updateRatingDto.id })

    if (meal) {
      await this.mealsRepository.save({
        id: updateRatingDto.id,
        rating: updateRatingDto.rating
      })
    }
  }

}
