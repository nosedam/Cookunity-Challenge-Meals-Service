import { Controller, Get, Post, Body, Param, UseInterceptors, ClassSerializerInterceptor, HttpStatus, HttpException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Public } from 'src/auth/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a customer' })
  @ApiCreatedResponse({type: Customer})
  @Public()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    if (createCustomerDto.password != createCustomerDto.passwordConfirmation) {
      throw new HttpException("password and password confirmation must be the same", HttpStatus.BAD_REQUEST)
    }
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View all customers' })
  @ApiOkResponse({type: Customer, isArray: true})
  @ApiBearerAuth()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View a customer' })
  @ApiOkResponse({type: Customer, isArray: true})
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

}
