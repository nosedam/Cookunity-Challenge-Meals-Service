import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateChefDto } from './dto/create-chef.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from './entities/chef.entity';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindMealsDto } from 'src/meals/dto/find-meals.dto';
import { RequestService } from 'src/request/request.service';
import { MealsService } from 'src/meals/meals.service';
import { LoggingService } from 'src/logging/logging.service';

@Injectable({scope: Scope.REQUEST})
export class ChefsService {

  constructor(
    @InjectRepository(Chef) private chefRepository: Repository<Chef>,
    private requestService: RequestService,
    private mealsService : MealsService,
    private loggingService: LoggingService
  ) {}

  create(createChefDto: CreateChefDto) {
    const chef = plainToInstance(Chef, createChefDto, {ignoreDecorators: true})
    return this.chefRepository.save(chef)
  }

  findAll() {
    return this.chefRepository.find();
  }

  findMeals(findMealsDto: FindMealsDto,pagination: PaginationDto) {
    return this.mealsService.findAll(findMealsDto, pagination)
  }

  async findOne(id: number) {
    const chef = await this.chefRepository.findOneBy({id: id})
    if (!chef) {
      throw new HttpException("Chef doesn't exist", HttpStatus.NOT_FOUND)
    }
    return chef;
  }

}
