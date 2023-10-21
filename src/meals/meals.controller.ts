import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { FindMealsDto } from './dto/find-meals.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Chef } from 'src/chefs/entities/chef.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Roles(Role.Chef)
  @Post()
  create(@Body() createMealDto: CreateMealDto, @Req() req) {
    const chef = req.user.id as Chef
    createMealDto.chef = chef
    return this.mealsService.create(createMealDto);
  }

  @Roles(Role.Customer)
  @Get()
  findAll(@Query() filters: FindMealsDto, @Query() pagination: PaginationDto) {
    return this.mealsService.findAll(filters, pagination);
  }

}
