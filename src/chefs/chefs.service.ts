import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateChefDto } from './dto/create-chef.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from './entities/chef.entity';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindMealsDto } from 'src/meals/dto/find-meals.dto';
import { MealsService } from 'src/meals/meals.service';
import { LoggingService } from 'src/logging/logging.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChefsService {

  constructor(
    @InjectRepository(Chef) private chefRepository: Repository<Chef>,
    private mealsService : MealsService,
    private usersService : UsersService,
  ) {}

  async create(createChefDto: CreateChefDto) {
    const user = await this.usersService.findByEmail(createChefDto.email)
    
    if (user) {
      throw new HttpException("a user with the same email already exists", HttpStatus.CONFLICT)
    }

    let chef = this.chefRepository.create(createChefDto)

    return this.chefRepository.save(chef)
  }

  findAll() {
    return this.chefRepository.find();
  }

  findMeals(findMealsDto: FindMealsDto,pagination: PaginationDto) {
    return this.mealsService.findAll(findMealsDto, pagination)
  }

  async findOne(id: string) {
    const chef = await this.chefRepository.findOneBy({id: id})
    if (!chef) {
      throw new HttpException("Chef doesn't exist", HttpStatus.NOT_FOUND)
    }
    return chef;
  }

}
