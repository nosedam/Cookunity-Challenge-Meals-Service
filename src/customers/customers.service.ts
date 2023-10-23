import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { LoggingService } from 'src/logging/logging.service';
import { UsersService } from 'src/users/users.service';
import { Chef } from 'src/chefs/entities/chef.entity';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    private usersService: UsersService
  ){}

  async create(createCustomerDto: CreateCustomerDto) {
    const user = await this.usersService.findByEmail(createCustomerDto.email)
    if (user) {
      throw new HttpException("a user with the same email already exists", HttpStatus.CONFLICT)
    }
    const customer = this.customerRepository.create(createCustomerDto)

    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOneBy({id: id})
    if (!customer) {
      throw new HttpException("Customer doesn't exist", HttpStatus.NOT_FOUND)
    }
    return customer;
  }

}
