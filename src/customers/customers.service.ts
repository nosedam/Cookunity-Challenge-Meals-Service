import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ){}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = plainToInstance(Customer, createCustomerDto, {ignoreDecorators: true})
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOneBy({id: id})
    if (!customer) {
      throw new HttpException("Customer doesn't exist", HttpStatus.NOT_FOUND)
    }
    return customer;
  }

}
