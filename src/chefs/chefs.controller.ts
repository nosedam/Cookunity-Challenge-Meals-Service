import { Controller, Get, Post, Body, Param, UseInterceptors, ClassSerializerInterceptor, Query, Req } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { CreateChefDto } from './dto/create-chef.dto';
import { Public } from 'src/auth/public.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Chef } from './entities/chef.entity';
import { FindMealsDto } from 'src/meals/dto/find-meals.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('chefs')
export class ChefsController {
  constructor(
    private readonly chefsService: ChefsService
  ) {}

  @Roles(Role.Chef)
  @Get('meals')
  findMeals(@Query() pagination: PaginationDto, @Req() req) {
    const user = req.user as Chef
    const findMealsDto = new FindMealsDto(user)
    return this.chefsService.findMeals(findMealsDto, pagination);
  }

  @Post()
  @Public()
  async create(@Body() createChefDto: CreateChefDto) {
    return this.chefsService.create(createChefDto);
  }

  @Get()
  findAll() {
    return this.chefsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chefsService.findOne(+id);
  }

}
