import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { FindMealsDto } from './dto/find-meals.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Meal } from './entities/meal.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetChef } from 'src/chefs/get-chef.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('meals')
@ApiBearerAuth()
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) { }

  @ApiOkResponse({
    description: 'The created meal',
    type: Meal,
    isArray: false
  })
  @Roles(Role.Chef)
  @ApiOperation({ summary: 'Create a meal as a chef' })
  @ApiCreatedResponse({ type: Meal, isArray: true })
  @Post()
  create(@Body() createMealDto: CreateMealDto, @GetChef() chef): Promise<Meal> {
    createMealDto.chef = chef
    return this.mealsService.create(createMealDto);
  }

  @Roles(Role.Customer)
  @Get()
  @ApiOperation({ summary: 'View all meals as a customer' })
  @ApiOkResponse({ type: Meal, isArray: true })
  findAll(@Query() filters: FindMealsDto, @Query() pagination: PaginationDto) {
    return this.mealsService.findAll(filters, pagination);
  }

}
