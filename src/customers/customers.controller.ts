import { Controller, Get, Post, Body, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
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
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View all customers' })
  @ApiOkResponse({type: Customer, isArray: true})
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'View a customer' })
  @ApiOkResponse({type: Customer, isArray: true})
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

}
