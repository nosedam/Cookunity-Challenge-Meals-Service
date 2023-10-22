import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { FindMealsDto } from './dto/find-meals.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Roles(Role.Chef)
  @Post()
  create(@Body() createMealDto: CreateMealDto, @Req() req) {
    createMealDto.chefId = req.user.id
    return this.mealsService.create(createMealDto);
  }

  @Roles(Role.Customer)
  @Get()
  findAll(@Query() filters: FindMealsDto, @Query() pagination: PaginationDto) {
    return this.mealsService.findAll(filters, pagination);
  }

}
