import { Controller, Get, Post, Body, Param, UseInterceptors, ClassSerializerInterceptor, Query, Req } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { CreateChefDto } from './dto/create-chef.dto';
import { Public } from 'src/auth/public.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Chef } from './entities/chef.entity';
import { FindMealsDto } from 'src/meals/dto/find-meals.dto';
import { GetChef } from './get-chef.decorator';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Meal } from 'src/meals/entities/meal.entity';

@ApiTags('chefs')
@Controller('chefs')
export class ChefsController {
  constructor(
    private readonly chefsService: ChefsService
  ) {}

  @Roles(Role.Chef)
  @Get('meals')
  @ApiOperation({ summary: 'View meals of the requesting chef' })
  @ApiOkResponse({type: Meal, isArray: true})
  findMeals(@Query() pagination: PaginationDto, @GetChef() chef) {
    const findMealsDto = new FindMealsDto(chef.id)
    return this.chefsService.findMeals(findMealsDto, pagination);
  }

  @Post()
  @ApiOperation({ summary: 'Create a chef' })
  @ApiCreatedResponse({type: Chef})
  @Public()
  async create(@Body() createChefDto: CreateChefDto) {
    return this.chefsService.create(createChefDto);
  }

  @Get()
  @ApiOperation({ summary: 'View all chefs' })
  @ApiOkResponse({type: Chef, isArray: true})
  findAll() {
    return this.chefsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'View a chef' })
  @ApiOkResponse({type: Chef})
  findOne(@Param('id') id: string) {
    return this.chefsService.findOne(id);
  }

}
